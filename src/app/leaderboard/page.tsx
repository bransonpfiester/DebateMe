"use client";

import { useState } from "react";
import Link from "next/link";
import { FilterTabs } from "@/components/FilterTabs";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MOCK_USERS } from "@/lib/mock-data";
import { CATEGORIES } from "@/types";

type LeaderboardTab = "global" | "week" | "category";

const TABS: { value: LeaderboardTab; label: string }[] = [
  { value: "global", label: "Global" },
  { value: "week", label: "This Week" },
  { value: "category", label: "By Category" },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("global");
  const [selectedCategory, setSelectedCategory] = useState("food");

  // In production, fetch from Supabase based on tab/category
  const users = MOCK_USERS;

  const rankColors = [
    "text-[#D4A017]", // Gold
    "text-[#999]", // Silver
    "text-[#B87333]", // Bronze
  ];

  return (
    <div className="pt-32 pb-20 px-6 md:px-12">
      {/* Header */}
      <h1 className="font-serif italic text-[clamp(48px,7vw,96px)] tracking-tightest leading-hero mb-16">
        Rankings.
      </h1>

      {/* Toggle Tabs */}
      <div className="mb-8">
        <FilterTabs filters={TABS} active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Category Filter (when By Category selected) */}
      {activeTab === "category" && (
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-[11px] tracking-[2px] uppercase border cursor-pointer transition-all ${
                selectedCategory === cat.value
                  ? "bg-dark text-cream border-dark"
                  : "bg-transparent text-muted border-white/[0.08] hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="w-full max-w-[900px]">
        {/* Header Row */}
        <div className="grid grid-cols-[40px_1fr_80px] md:grid-cols-[50px_1fr_100px_120px_80px] gap-4 py-3 border-b border-white/[0.08] text-[10px] tracking-[2.5px] uppercase text-muted">
          <span>#</span>
          <span>Debater</span>
          <span>Elo</span>
          <span className="hidden md:block">Record</span>
          <span className="hidden md:block">Win %</span>
        </div>

        {/* Data Rows */}
        <div className="stagger-children">
          {users.map((user, i) => {
            const winRate = Math.round(
              (user.wins / (user.wins + user.losses)) * 100
            );
            return (
              <ScrollReveal key={user.id} direction="left" delay={i * 120}>
                <Link
                  href={`/profile/${user.username}`}
                  className="grid grid-cols-[40px_1fr_80px] md:grid-cols-[50px_1fr_100px_120px_80px] gap-4 py-6 border-b border-white/[0.04] items-center hover:bg-white/[0.03] transition-colors no-underline text-dark"
                >
                  <span
                    className={`font-serif italic text-lg ${
                      i < 3 ? rankColors[i] : "text-muted"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: user.avatar_color }}
                    />
                    <span className="font-normal text-[15px]">
                      {user.username}
                    </span>
                    {user.streak >= 3 && (
                      <span className="text-xs" title={`${user.streak} win streak`}>
                        🔥
                      </span>
                    )}
                  </div>
                  <span className="font-serif italic text-[17px]">
                    {user.elo_rating}
                  </span>
                  <span className="text-[13px] text-dark/40 font-light hidden md:block">
                    {user.wins}W – {user.losses}L
                  </span>
                  <span className="text-[13px] font-medium hidden md:block">
                    {winRate}%
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
