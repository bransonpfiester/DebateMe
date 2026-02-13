"use client";

import { useEffect, useRef, useState } from "react";

interface VoteBarProps {
  humanPct: number;
  aiPct: number;
  voteCount?: number;
  timeAgo?: string;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function VoteBar({
  humanPct,
  aiPct,
  voteCount,
  timeAgo,
  showLabel = false,
  size = "md",
}: VoteBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const trackHeight = size === "sm" ? "h-[6px]" : "h-2";

  return (
    <div className="w-full">
      <div className="flex items-center gap-5">
        {showLabel && (
          <span className="text-[10.5px] tracking-[2px] uppercase text-muted whitespace-nowrap">
            Community vote
          </span>
        )}
        <div
          ref={barRef}
          className={`flex-1 ${trackHeight} bg-dark/[0.04] rounded-full overflow-hidden`}
        >
          <div
            className="h-full rounded-full transition-transform duration-[1500ms] ease-smooth origin-left"
            style={{
              background: `linear-gradient(90deg, #4d7aff 0%, #4d7aff ${humanPct}%, transparent ${humanPct}%, transparent ${humanPct + 1}%, #ff5249 ${humanPct + 1}%, #ff5249 100%)`,
              transform: animated ? "scaleX(1)" : "scaleX(0)",
            }}
          />
        </div>
        <div className="flex gap-3 text-sm font-medium">
          <span className="text-accent-blue">{humanPct}%</span>
          <span className="text-accent-red">{aiPct}%</span>
        </div>
      </div>
      {(voteCount !== undefined || timeAgo) && (
        <div className="flex gap-3 mt-2 text-xs text-muted">
          {voteCount !== undefined && (
            <span>{voteCount.toLocaleString()} votes</span>
          )}
          {timeAgo && <span>{timeAgo}</span>}
        </div>
      )}
    </div>
  );
}
