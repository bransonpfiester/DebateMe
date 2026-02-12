"use client";

import { useState } from "react";
import { DailyPrompt } from "@/components/DailyPrompt";
import { FilterTabs } from "@/components/FilterTabs";
import { DebateCard } from "@/components/DebateCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MOCK_DEBATES, DAILY_PROMPT } from "@/lib/mock-data";
import { FEED_FILTERS, FeedFilter } from "@/types";

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("all");

  const filteredDebates = MOCK_DEBATES.filter((d) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "trending") return d.vote_count > 500;
    if (activeFilter === "upsets") return d.ai_vote_pct > d.human_vote_pct;
    return d.category === activeFilter;
  });

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-[900px] mx-auto">
      {/* Daily Prompt */}
      <DailyPrompt prompt={DAILY_PROMPT} />

      {/* Filter Tabs */}
      <div className="mb-8">
        <FilterTabs
          filters={FEED_FILTERS}
          active={activeFilter}
          onChange={setActiveFilter}
        />
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-6 stagger-children">
        {filteredDebates.length > 0 ? (
          filteredDebates.map((debate, i) => (
            <ScrollReveal key={debate.id} delay={i * 120}>
              <DebateCard debate={debate} />
            </ScrollReveal>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="font-serif italic text-2xl text-muted mb-3">
              No debates yet.
            </p>
            <p className="text-sm text-muted font-light">
              Be the first to start one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
