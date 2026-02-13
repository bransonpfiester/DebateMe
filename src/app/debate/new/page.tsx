"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, DebateCategory } from "@/types";

export default function StartDebatePage() {
  return (
    <Suspense fallback={<StartDebateLoading />}>
      <StartDebateContent />
    </Suspense>
  );
}

function StartDebateLoading() {
  return (
    <div className="pt-40 pb-32 px-6 md:px-12 max-w-[640px] mx-auto text-center">
      <h1 className="font-serif italic text-[clamp(48px,6vw,80px)] tracking-tightest leading-hero mb-16">
        Drop your take.
      </h1>
    </div>
  );
}

function StartDebateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptFromUrl = searchParams.get("prompt") || "";

  const [topic, setTopic] = useState(promptFromUrl);
  const [category, setCategory] = useState<DebateCategory>("life");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || topic.trim().length < 3) return;

    setLoading(true);

    try {
      const res = await fetch("/api/debates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), category }),
      });

      if (res.ok) {
        const debate = await res.json();
        router.push(`/arena/${debate.id}`);
      } else {
        // If not authenticated, redirect to auth — for demo, go to arena mock
        router.push(`/arena/demo?topic=${encodeURIComponent(topic.trim())}&category=${category}`);
      }
    } catch {
      // Fallback to demo arena for development
      router.push(`/arena/demo?topic=${encodeURIComponent(topic.trim())}&category=${category}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-40 pb-32 px-6 md:px-12 max-w-[640px] mx-auto">
      {/* Heading */}
      <h1 className="font-serif italic text-[clamp(48px,6vw,80px)] tracking-tightest leading-hero mb-16 text-center">
        Drop your take.
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Topic Input */}
        <div>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Pineapple belongs on pizza..."
            maxLength={200}
            rows={2}
            className="w-full bg-transparent border-none border-b-2 border-white/[0.1] text-lg font-serif italic leading-relaxed placeholder:text-dark/25 focus:outline-none focus:border-white/30 resize-none py-4 transition-colors"
            style={{
              borderBottom: "1px solid rgba(10,10,10,0.1)",
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted">
              {topic.length} / 200 characters
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div>
          <label className="text-[11px] tracking-[2px] uppercase text-muted mb-4 block">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-[11px] tracking-[2px] uppercase border cursor-pointer transition-all ${
                  category === cat.value
                    ? "bg-dark text-cream border-dark"
                    : "bg-transparent text-muted border-white/[0.08] hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Prompt Shortcut */}
        {!promptFromUrl && (
          <Link
            href={`/debate/new?prompt=${encodeURIComponent("Is college still worth it?")}`}
            className="text-[11px] tracking-[2px] uppercase text-muted no-underline hover:text-dark transition-colors"
          >
            Or use today&apos;s prompt &rarr;
          </Link>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={topic.trim().length < 3 || loading}
          className="mt-4 bg-dark text-cream px-11 py-[18px] rounded-full font-sans text-xs font-medium tracking-[2px] uppercase cursor-pointer transition-all duration-350 ease-smooth hover:scale-[1.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 self-center"
        >
          {loading ? "Entering..." : "Enter the Arena \u2192"}
        </button>
      </form>
    </div>
  );
}
