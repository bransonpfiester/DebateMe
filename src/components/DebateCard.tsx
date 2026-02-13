import Link from "next/link";
import { VoteBar } from "./VoteBar";
import { getTimeAgo } from "@/lib/mock-data";
import type { Debate, User } from "@/types";

interface DebateCardProps {
  debate: Debate & {
    user: User;
    vote_count: number;
    human_vote_pct: number;
    ai_vote_pct: number;
  };
  showResult?: boolean;
}

export function DebateCard({ debate, showResult = false }: DebateCardProps) {
  const humanWon = debate.human_vote_pct > debate.ai_vote_pct;

  return (
    <div className="bg-surface rounded-card p-7 md:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-[2px] group">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-medium"
            style={{ backgroundColor: debate.user.avatar_color }}
          >
            {debate.user.username[0].toUpperCase()}
          </div>
          <span className="text-sm font-normal">{debate.user.username}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[2px] uppercase text-muted bg-white/[0.06] px-3 py-1.5 rounded-full">
            vs AI
          </span>
          <span className="text-[10px] tracking-[2px] uppercase text-muted bg-white/[0.06] px-3 py-1.5 rounded-full">
            {debate.category}
          </span>
        </div>
      </div>

      {/* Topic */}
      <Link
        href={`/debate/${debate.id}`}
        className="block no-underline text-dark"
      >
        <h3 className="font-serif italic text-xl md:text-[22px] leading-tight mb-5">
          &ldquo;{debate.topic}&rdquo;
        </h3>
      </Link>

      {/* Vote Bar */}
      <VoteBar
        humanPct={debate.human_vote_pct}
        aiPct={debate.ai_vote_pct}
        voteCount={debate.vote_count}
        timeAgo={getTimeAgo(debate.created_at)}
        size="sm"
      />

      {/* Read Debate Link + optional result */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark/[0.06]">
        <Link
          href={`/debate/${debate.id}`}
          className="text-[11px] tracking-[2px] uppercase text-muted no-underline hover:text-dark transition-colors"
        >
          Read debate &rarr;
        </Link>
        {showResult && (
          <span
            className={`text-[10px] tracking-[2px] uppercase font-medium px-3 py-1 rounded-full ${
              humanWon
                ? "bg-accent-blue/10 text-accent-blue"
                : "bg-accent-red/10 text-accent-red"
            }`}
          >
            {humanWon ? "Won" : "Lost"}
          </span>
        )}
      </div>
    </div>
  );
}
