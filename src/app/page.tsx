"use client";

import Link from "next/link";
import { HeroCanvas } from "@/components/HeroCanvas";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArgumentBubble } from "@/components/ArgumentBubble";
import { VoteBar } from "@/components/VoteBar";
import { MOCK_USERS } from "@/lib/mock-data";

export default function LandingPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-end overflow-hidden">
        <HeroCanvas />
        <div className="relative z-[2] px-6 md:px-12 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h1 className="font-serif text-[clamp(56px,9vw,130px)] leading-hero tracking-tightest font-normal">
            Meet us
            <br />
            <span className="italic block">in the arena.</span>
          </h1>
          <div className="flex flex-col items-start md:items-end gap-6 pb-2">
            <p className="max-w-[300px] text-right text-sm leading-relaxed text-muted font-light max-[900px]:text-left">
              A competitive debate platform where humans argue against AI and
              the internet decides who wins.
            </p>
          </div>
        </div>
        <span className="absolute bottom-12 left-12 z-[2] text-[11px] tracking-[1.5px] uppercase text-muted hidden md:block">
          Debate Me &copy;2026
        </span>
        <a
          href="#about"
          className="absolute bottom-12 right-12 z-[2] flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-muted no-underline hover:text-dark transition-colors hidden md:flex"
        >
          Explore
        </a>
      </section>

      {/* ========== STAGGERED TEXT ========== */}
      <section className="py-[200px] max-[900px]:py-[120px] px-6 md:px-12 flex flex-col gap-[200px] max-[900px]:gap-[120px]">
        <ScrollReveal>
          <h2 className="font-serif text-[clamp(48px,7vw,96px)] font-normal tracking-tightest leading-tight">
            You argue<em className="text-accent-blue">...</em>
          </h2>
        </ScrollReveal>
        <ScrollReveal className="text-right">
          <h2 className="font-serif text-[clamp(48px,7vw,96px)] font-normal tracking-tightest leading-tight">
            AI argues <em className="italic text-accent-red">back.</em>
          </h2>
        </ScrollReveal>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about" className="px-6 md:px-12 pb-[160px] max-[900px]:pb-[100px] pt-20 max-[900px]:pt-[60px]">
        <div className="max-w-[640px] mb-[120px]">
          <span className="text-[11px] tracking-[2.5px] uppercase text-muted mb-8 block">
            Where our name comes from
          </span>
          <p className="text-lg leading-[1.75] text-dark/65 font-light">
            Inspired by the ancient art of dialectic — the pursuit of truth
            through structured argument. We believe the best ideas emerge when
            they&apos;re tested against their strongest opposition. Debate Me is
            the arena where your convictions are forged in fire.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] md:gap-20 stagger-children">
          <ScrollReveal>
            <span className="font-serif text-sm italic text-muted mb-5 block">
              01.
            </span>
            <h3 className="font-serif text-[28px] font-normal tracking-[-0.5px] mb-4">
              What we do.
            </h3>
            <p className="text-[14.5px] leading-[1.75] text-dark/55 font-light max-w-[420px]">
              You submit a hot take on any topic. AI takes the opposite position
              and argues back with logic, evidence, and rhetorical precision.
              Three rounds. No mercy. No strawmen.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <span className="font-serif text-sm italic text-muted mb-5 block">
              02.
            </span>
            <h3 className="font-serif text-[28px] font-normal tracking-[-0.5px] mb-4">
              How it works.
            </h3>
            <p className="text-[14.5px] leading-[1.75] text-dark/55 font-light max-w-[420px]">
              After three rounds of debate, your exchange goes live. The
              community reads both sides and votes on the winner. Your Elo rating
              rises or falls. Reputations are built one argument at a time.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== PRINCIPLES ========== */}
      <section
        id="principles"
        className="bg-dark text-cream py-[160px] max-[900px]:py-[100px] px-6 md:px-12"
      >
        <h2 className="font-serif text-[clamp(42px,5vw,64px)] font-normal tracking-tightest mb-[100px]">
          Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] stagger-children">
          {[
            {
              title: "Argue with conviction.",
              desc: "The strongest debates come from people who believe what they say. Take a real position, defend it fiercely, and trust that truth survives scrutiny.",
              quote:
                '"The test of a first-rate intelligence is the ability to hold two opposed ideas in mind and still retain the ability to function."',
              cite: "F. Scott Fitzgerald",
            },
            {
              title: "Steelman, never strawman.",
              desc: "The AI doesn't take cheap shots. It argues the strongest possible version of the opposing case. If you can beat that, you've earned the win.",
              quote:
                '"It is the mark of an educated mind to be able to entertain a thought without accepting it."',
              cite: "Aristotle",
            },
            {
              title: "Let the crowd decide.",
              desc: "Democracy in its purest form. No algorithm picks winners. Real people read your debate and vote on who made the better case. Period.",
              quote:
                '"In a debate, the truth is not determined by the loudest voice, but by the clearest thinking."',
              cite: "Unknown",
            },
          ].map((principle, i) => (
            <ScrollReveal key={i}>
              <div className="border border-dark/[0.08] p-9 md:p-12 flex flex-col gap-6 min-h-[360px] hover:bg-dark/[0.03] transition-colors">
                <h3 className="font-serif text-[26px] font-normal italic tracking-[-0.5px]">
                  {principle.title}
                </h3>
                <p className="text-sm leading-[1.75] text-dark/50 font-light flex-1">
                  {principle.desc}
                </p>
                <div className="border-t border-dark/[0.08] pt-5 mt-auto">
                  <blockquote className="font-serif italic text-[15px] leading-relaxed text-dark/40 mb-2">
                    {principle.quote}
                  </blockquote>
                  <cite className="font-sans not-italic text-[11px] tracking-[1.5px] uppercase text-dark/25">
                    — {principle.cite}
                  </cite>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========== ARENA PREVIEW ========== */}
      <section id="arena" className="py-[160px] max-[900px]:py-[100px] px-6 md:px-12">
        <h2 className="font-serif text-[clamp(48px,7vw,96px)] font-normal italic tracking-tightest mb-20">
          The Arena.
        </h2>
        <ScrollReveal>
          <div className="bg-surface rounded-card p-7 md:p-14 shadow-card">
            {/* Meta */}
            <div className="flex justify-between items-center mb-12 pb-7 border-b border-white/[0.08]">
              <span className="font-serif text-[22px] italic">
                &ldquo;Pineapple belongs on pizza.&rdquo;
              </span>
              <span className="text-[10.5px] tracking-[2px] uppercase text-muted bg-white/[0.06] px-4 py-2 rounded-full">
                Round 1 of 3
              </span>
            </div>
            {/* Debate Rounds */}
            <div className="flex flex-col gap-6">
              <ArgumentBubble
                speaker="human"
                text="The sweet-savory contrast of pineapple with salty ham and tangy tomato sauce creates a flavor profile that's fundamentally more complex than any traditional topping. Hawaiian pizza outsells most specialty pizzas for a reason."
              />
              <ArgumentBubble
                speaker="ai"
                text="Popularity isn't culinary merit — it's accessibility. Pineapple releases moisture during baking that compromises dough integrity and dilutes the Maillard reaction on cheese. The sweetness overrides the balance Italian cuisine spent centuries perfecting."
              />
            </div>
            {/* Vote */}
            <div className="mt-12 pt-8 border-t border-white/[0.08]">
              <VoteBar humanPct={62} aiPct={38} showLabel />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="px-6 md:px-12 pb-[160px] max-[900px]:pb-[100px]">
        <h2 className="font-serif text-[clamp(42px,5vw,64px)] font-normal tracking-tightest leading-tight mb-20">
          Built for
          <br />
          competition.
        </h2>
        <div className="flex flex-col border-t border-white/[0.08] stagger-children">
          {[
            {
              num: "01.",
              name: "Elo Rating",
              desc: "A dynamic skill rating that rises and falls with every debate. Win against community consensus and climb the global leaderboard.",
            },
            {
              num: "02.",
              name: "Streak Tracking",
              desc: "Consecutive wins build your streak counter. Break records, earn fire badges, and let the arena know you're on a run.",
            },
            {
              num: "03.",
              name: "Badges",
              desc: 'Unlock achievements like First Blood, AI Slayer, Crowd Favorite, and Philosopher King. Collect them all on your public profile.',
            },
            {
              num: "04.",
              name: "Live Feed",
              desc: "Browse debates in real time. Filter by category, sort by trending or biggest upsets, and vote on who made the stronger case.",
            },
            {
              num: "05.",
              name: "Daily Prompts",
              desc: "Fresh debate topics delivered every day. Jump into trending conversations or submit your own controversial take.",
            },
          ].map((feature, i) => (
            <ScrollReveal key={i}>
              <div className="grid grid-cols-1 md:grid-cols-[80px_280px_1fr] gap-2 md:gap-10 py-10 border-b border-white/[0.08] items-start hover:bg-white/[0.03] transition-colors md:hover:mx-[-20px] md:hover:px-5">
                <span className="font-serif italic text-sm text-muted pt-1 hidden md:block">
                  {feature.num}
                </span>
                <span className="font-serif text-2xl font-normal tracking-[-0.5px] pt-0.5">
                  {feature.name}
                </span>
                <span className="text-[14.5px] leading-[1.75] text-dark/50 font-light max-w-[480px]">
                  {feature.desc}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========== LEADERBOARD PREVIEW ========== */}
      <section
        id="leaderboard"
        className="bg-dark text-cream py-[160px] max-[900px]:py-[100px] px-6 md:px-12"
      >
        <h2 className="font-serif text-[clamp(48px,7vw,96px)] font-normal italic tracking-tightest mb-20">
          Rankings.
        </h2>
        <div className="w-full max-w-[900px]">
          {/* Header */}
          <div className="grid grid-cols-[40px_1fr_80px] md:grid-cols-[50px_1fr_100px_120px_80px] gap-4 py-3 border-b border-dark/10 text-[10px] tracking-[2.5px] uppercase text-dark/30">
            <span>#</span>
            <span>Debater</span>
            <span>Elo</span>
            <span className="hidden md:block">Record</span>
            <span className="hidden md:block">Win %</span>
          </div>
          {/* Rows */}
          <div className="stagger-children">
            {MOCK_USERS.map((user, i) => {
              const rankColors = [
                "text-[#D4A017]",
                "text-[#999]",
                "text-[#B87333]",
                "text-cream/30",
                "text-cream/30",
              ];
              const winRate = Math.round(
                (user.wins / (user.wins + user.losses)) * 100
              );
              return (
                <ScrollReveal key={user.id} direction="left">
                  <div className="grid grid-cols-[40px_1fr_80px] md:grid-cols-[50px_1fr_100px_120px_80px] gap-4 py-6 border-b border-dark/[0.04] items-center hover:bg-dark/[0.02] transition-colors">
                    <span
                      className={`font-serif italic text-lg ${rankColors[i]}`}
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
                    </div>
                    <span className="font-serif italic text-[17px]">
                      {user.elo_rating}
                    </span>
                    <span className="text-[13px] text-cream/40 font-light hidden md:block">
                      {user.wins}W – {user.losses}L
                    </span>
                    <span className="text-[13px] font-medium hidden md:block">
                      {winRate}%
                    </span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section
        id="cta"
        className="py-[200px] max-[900px]:py-[120px] px-6 md:px-12 flex flex-col items-center text-center"
      >
        <h2 className="font-serif text-[clamp(56px,9vw,140px)] font-normal tracking-[-3px] leading-hero mb-10">
          Think you
          <br />
          can <em className="italic text-accent-red">win?</em>
        </h2>
        <p className="text-[15px] text-muted font-light mb-14 leading-[1.7] max-w-[340px]">
          Enter the arena. Drop your hottest take. Prove the internet wrong —
          one round at a time.
        </p>
        <Link
          href="/debate/new"
          className="inline-flex items-center gap-2.5 bg-dark text-cream px-11 py-[18px] rounded-full font-sans text-xs font-medium tracking-[2px] uppercase no-underline cursor-pointer transition-all duration-350 ease-smooth hover:scale-[1.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)]"
        >
          Start a debate &rarr;
        </Link>
      </section>
    </>
  );
}
