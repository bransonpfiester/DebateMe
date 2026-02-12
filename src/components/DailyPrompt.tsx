"use client";

import { useState } from "react";
import Link from "next/link";

interface DailyPromptProps {
  prompt: string;
}

export function DailyPrompt({ prompt }: DailyPromptProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-cream border border-dark/[0.06] rounded-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-8 flex-1">
        <span className="font-serif italic text-sm text-muted whitespace-nowrap">
          Today&apos;s Prompt
        </span>
        <span className="font-serif italic text-xl md:text-2xl">
          &ldquo;{prompt}&rdquo;
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={`/debate/new?prompt=${encodeURIComponent(prompt)}`}
          className="text-[11px] tracking-[2px] uppercase text-muted no-underline hover:text-dark transition-colors whitespace-nowrap"
        >
          Debate This &rarr;
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted hover:text-dark transition-colors bg-transparent border-none cursor-pointer text-lg leading-none"
          aria-label="Dismiss daily prompt"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
