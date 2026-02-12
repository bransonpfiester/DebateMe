"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ArgumentBubble } from "@/components/ArgumentBubble";
import { VoteBar } from "@/components/VoteBar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MOCK_DEBATES, getTimeAgo } from "@/lib/mock-data";

export default function DebateViewPage() {
  const params = useParams();
  const debateId = params.id as string;

  const debate = MOCK_DEBATES.find((d) => d.id === debateId) || MOCK_DEBATES[0];
  const [voted, setVoted] = useState<"human" | "ai" | null>(null);
  const [comment, setComment] = useState("");

  // Mock comments
  const comments = [
    { user: "logic_lord", color: "#64dca0", text: "The Big Mac analogy was chef's kiss." },
    { user: "hot_takes_only", color: "#a78bfa", text: "Human had stronger evidence but AI's rhetoric was better." },
    { user: "debate_watcher", color: "#e03e36", text: "Both sides made great points. Hard to pick a winner." },
  ];

  const handleVote = async (voteFor: "human" | "ai") => {
    setVoted(voteFor);
    // In production, call /api/vote
    try {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ debate_id: debateId, vote_for: voteFor }),
      });
    } catch {
      // Silent fail in demo mode
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-[800px] mx-auto">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-dark/[0.06]">
        <h1 className="font-serif italic text-[clamp(28px,4vw,48px)] tracking-[-1px] leading-tight mb-6">
          &ldquo;{debate.topic}&rdquo;
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium"
              style={{ backgroundColor: debate.user.avatar_color }}
            >
              {debate.user.username[0].toUpperCase()}
            </div>
            <span className="text-sm">{debate.user.username}</span>
          </div>
          <span className="text-[10px] tracking-[2px] uppercase text-muted bg-cream px-3 py-1.5 rounded-full">
            vs AI
          </span>
          <span className="text-[10px] tracking-[2px] uppercase text-muted bg-cream px-3 py-1.5 rounded-full">
            {debate.category}
          </span>
          <span className="text-xs text-muted">
            {getTimeAgo(debate.created_at)}
          </span>
        </div>
      </div>

      {/* Debate Rounds */}
      <div className="flex flex-col gap-6">
        {debate.rounds.map((round, i) => (
          <ScrollReveal key={round.id} delay={i * 200}>
            <div className="flex flex-col gap-6">
              {/* Round Label */}
              <div className="text-center py-6">
                <span className="font-serif italic text-sm text-muted">
                  Round {round.round_number}
                </span>
              </div>
              {/* Arguments */}
              <ArgumentBubble speaker="human" text={round.user_argument} />
              <ArgumentBubble speaker="ai" text={round.ai_argument} />
              {/* Spacing between rounds */}
              {i < debate.rounds.length - 1 && <div className="h-8" />}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Voting Section */}
      <div className="mt-16 pt-10 border-t border-dark/[0.06]">
        {!voted ? (
          <div>
            <h2 className="font-serif text-2xl mb-8">
              Who won this debate?
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => handleVote("human")}
                className="flex-1 py-4 px-6 rounded-full border-2 border-accent-blue text-accent-blue bg-transparent font-sans text-sm font-medium tracking-[1px] uppercase cursor-pointer transition-all hover:bg-accent-blue hover:text-white"
              >
                Human won
              </button>
              <button
                onClick={() => handleVote("ai")}
                className="flex-1 py-4 px-6 rounded-full border-2 border-accent-red text-accent-red bg-transparent font-sans text-sm font-medium tracking-[1px] uppercase cursor-pointer transition-all hover:bg-accent-red hover:text-white"
              >
                AI won
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-sm text-muted mb-4">
              You voted for {voted === "human" ? "Human" : "AI"}
            </p>
            <VoteBar
              humanPct={debate.human_vote_pct}
              aiPct={debate.ai_vote_pct}
              voteCount={debate.vote_count}
              showLabel
            />
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="mt-16 pt-10 border-t border-dark/[0.06]">
        <h3 className="font-serif italic text-xl mb-8">Comments</h3>
        <div className="flex flex-col gap-5 mb-8">
          {comments.map((c, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-6 h-6 rounded-full shrink-0 mt-0.5"
                style={{ backgroundColor: c.color }}
              />
              <div>
                <span className="text-sm font-medium">{c.user}</span>
                <p className="text-sm text-dark/60 font-light mt-1">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Add Comment */}
        <div className="flex gap-3">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-transparent border-b border-dark/10 py-2 text-sm font-light placeholder:text-dark/25 focus:outline-none focus:border-dark/30"
          />
          <button
            disabled={!comment.trim()}
            className="text-[11px] tracking-[2px] uppercase text-muted hover:text-dark transition-colors disabled:opacity-30 bg-transparent border-none cursor-pointer"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
