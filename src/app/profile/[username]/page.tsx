"use client";

import { useParams } from "next/navigation";
import { DebateCard } from "@/components/DebateCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MOCK_USERS, MOCK_DEBATES } from "@/lib/mock-data";
import { BADGE_INFO, BadgeType } from "@/types";

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  // Find user (fallback to first mock user)
  const user =
    MOCK_USERS.find((u) => u.username === username) ||
    (username === "me" ? MOCK_USERS[0] : MOCK_USERS[0]);

  const winRate = Math.round(
    (user.wins / (user.wins + user.losses)) * 100
  );

  // Mock earned badges
  const earnedBadges: BadgeType[] = [
    "first-blood",
    "on-fire",
    "ai-slayer",
    "debates-10",
    "streak-5",
  ];

  const allBadges = Object.entries(BADGE_INFO) as [BadgeType, typeof BADGE_INFO[BadgeType]][];

  // User's debates
  const userDebates = MOCK_DEBATES.filter(
    (d) => d.user_id === user.id
  );

  // Stats
  const totalVotes = userDebates.reduce((sum, d) => sum + d.vote_count, 0);

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-[900px] mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-16">
        {/* Avatar */}
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white text-2xl font-medium mb-4"
          style={{ backgroundColor: user.avatar_color }}
        >
          {user.username[0].toUpperCase()}
        </div>
        {/* Username */}
        <h1 className="text-2xl font-medium mb-1">{user.username}</h1>
        {/* Elo */}
        <div className="text-center mt-3">
          <span className="text-[10px] tracking-[2.5px] uppercase text-muted block mb-1">
            ELO
          </span>
          <span className="font-serif italic text-[clamp(36px,5vw,48px)]">
            {user.elo_rating}
          </span>
        </div>
        {/* Win/Loss */}
        <p className="text-[15px] text-dark/50 font-light mt-2">
          {user.wins}W – {user.losses}L
        </p>
      </div>

      {/* Stats Row */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 border border-white/[0.08] rounded-card overflow-hidden mb-16">
          {[
            { value: user.wins + user.losses, label: "Total Debates" },
            { value: `${winRate}%`, label: "Win Rate" },
            {
              value: `${user.best_streak}`,
              label: "Best Streak 🔥",
            },
            { value: totalVotes.toLocaleString(), label: "Total Votes" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center py-8 px-4 ${
                i < 3 ? "md:border-r border-white/[0.08]" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-white/[0.08]" : ""} ${
                i === 2 ? "border-b md:border-b-0 border-white/[0.08]" : ""
              }`}
            >
              <span className="font-serif italic text-[28px]">
                {stat.value}
              </span>
              <span className="text-[10px] tracking-[2px] uppercase text-muted mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Badges */}
      <ScrollReveal>
        <div className="mb-16">
          <h2 className="font-serif italic text-2xl mb-8">Badges</h2>
          <div className="flex flex-wrap gap-6">
            {allBadges.map(([type, info]) => {
              const earned = earnedBadges.includes(type);
              return (
                <div
                  key={type}
                  className={`flex flex-col items-center gap-2 w-20 ${
                    earned ? "opacity-100" : "opacity-20"
                  }`}
                  title={info.description}
                >
                  <span className="text-3xl">{info.emoji}</span>
                  <span className="text-[9px] tracking-[1.5px] uppercase text-center leading-tight">
                    {info.name}
                  </span>
                  {!earned && (
                    <span className="text-[10px] text-muted">🔒</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Debate History */}
      <div>
        <h2 className="font-serif italic text-2xl mb-8">History</h2>
        <div className="flex flex-col gap-6 stagger-children">
          {userDebates.length > 0 ? (
            userDebates.map((debate, i) => (
              <ScrollReveal key={debate.id} delay={i * 120}>
                <DebateCard debate={debate} showResult />
              </ScrollReveal>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="font-serif italic text-xl text-muted">
                No debates yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
