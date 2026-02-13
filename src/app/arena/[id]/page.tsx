"use client";

import { Suspense, useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { ArgumentBubble } from "@/components/ArgumentBubble";
import Link from "next/link";

interface RoundData {
  roundNumber: number;
  userArgument: string;
  aiArgument: string;
}

export default function ArenaPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-28 pb-20 px-6 md:px-12 max-w-[800px] mx-auto">
          <div className="bg-surface rounded-card p-7 md:p-12 shadow-card animate-pulse min-h-[400px]" />
        </div>
      }
    >
      <ArenaContent />
    </Suspense>
  );
}

function ArenaContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const debateId = params.id as string;

  const isDemo = debateId === "demo";
  const topic = searchParams.get("topic") || "Pineapple belongs on pizza.";
  const category = searchParams.get("category") || "food";

  const [currentRound, setCurrentRound] = useState(1);
  const [argument, setArgument] = useState("");
  const [rounds, setRounds] = useState<RoundData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showRoundFlash, setShowRoundFlash] = useState(false);
  const [completed, setCompleted] = useState(false);

  const wordCount = argument.trim() ? argument.trim().split(/\s+/).length : 0;

  const handleSubmitArgument = async () => {
    if (wordCount < 5 || wordCount > 150 || loading) return;

    setLoading(true);

    try {
      if (isDemo) {
        // Demo mode: generate a mock AI response
        await new Promise((r) => setTimeout(r, 1500));
        const mockAiResponses = [
          "That's an interesting take, but it falls apart under scrutiny. The evidence suggests the opposite — when you look at the data objectively, the trends don't support your conclusion. Correlation isn't causation, and the examples you cite are cherry-picked from a much larger dataset that tells a different story entirely.",
          "You're making an emotional argument dressed up as logic. Strip away the rhetoric and what's left? An assumption based on personal experience, projected onto a population of billions. The counterexamples are numerous, well-documented, and far more representative of reality than your anecdotal evidence suggests.",
          "I'll grant you one thing — your framing is compelling. But compelling isn't the same as correct. History is littered with ideas that sounded good in theory but crumbled in practice. The real test isn't whether an argument feels right, but whether it survives contact with uncomfortable facts.",
        ];

        const aiResponse = mockAiResponses[currentRound - 1] || mockAiResponses[0];

        const newRound: RoundData = {
          roundNumber: currentRound,
          userArgument: argument.trim(),
          aiArgument: aiResponse,
        };

        setRounds((prev) => [...prev, newRound]);
        setArgument("");

        if (currentRound < 3) {
          // Show round transition
          setShowRoundFlash(true);
          setTimeout(() => {
            setShowRoundFlash(false);
            setCurrentRound((prev) => prev + 1);
          }, 1500);
        } else {
          setCompleted(true);
        }
      } else {
        // Real mode: call API
        const res = await fetch("/api/argue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            debate_id: debateId,
            round_number: currentRound,
            user_argument: argument.trim(),
          }),
        });

        if (res.ok) {
          const round = await res.json();
          const newRound: RoundData = {
            roundNumber: currentRound,
            userArgument: round.user_argument,
            aiArgument: round.ai_argument,
          };

          setRounds((prev) => [...prev, newRound]);
          setArgument("");

          if (currentRound < 3) {
            setShowRoundFlash(true);
            setTimeout(() => {
              setShowRoundFlash(false);
              setCurrentRound((prev) => prev + 1);
            }, 1500);
          } else {
            setCompleted(true);
          }
        }
      }
    } catch (err) {
      console.error("Error submitting argument:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom when new rounds appear
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [rounds, showRoundFlash]);

  return (
    <div className="pt-28 pb-20 px-6 md:px-12 max-w-[800px] mx-auto">
      {/* Arena Card */}
      <div className="bg-surface rounded-card p-7 md:p-12 shadow-card">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-7 border-b border-white/[0.08]">
          <h1 className="font-serif italic text-xl md:text-2xl">
            &ldquo;{topic}&rdquo;
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-[10.5px] tracking-[2px] uppercase text-muted bg-white/[0.06] px-4 py-2 rounded-full">
              Round {currentRound} of 3
            </span>
            <span className="text-[10.5px] tracking-[2px] uppercase text-muted bg-white/[0.06] px-4 py-2 rounded-full">
              {category}
            </span>
          </div>
        </div>

        {/* Debate Content */}
        <div className="flex flex-col gap-6 min-h-[200px]">
          {rounds.map((round, i) => (
            <div key={i} className="flex flex-col gap-6">
              {i > 0 && (
                <div className="text-center py-6">
                  <span className="font-serif italic text-sm text-muted">
                    Round {round.roundNumber}
                  </span>
                </div>
              )}
              <ArgumentBubble
                speaker="human"
                text={round.userArgument}
                animate
                delay={0}
              />
              <ArgumentBubble
                speaker="ai"
                text={round.aiArgument}
                animate
                delay={300}
              />
            </div>
          ))}

          {/* Round Transition Flash */}
          {showRoundFlash && (
            <div className="flex items-center justify-center py-12 animate-fade-in">
              <span className="font-serif italic text-3xl text-dark/60">
                Round {currentRound + 1}
              </span>
            </div>
          )}

          {/* Empty State */}
          {rounds.length === 0 && !showRoundFlash && (
            <div className="flex items-center justify-center py-16">
              <p className="font-serif italic text-lg text-muted">
                Make your opening argument below.
              </p>
            </div>
          )}
        </div>

        {/* Input Area */}
        {!completed ? (
          <div className="mt-10 pt-8 border-t border-white/[0.08]">
            <textarea
              value={argument}
              onChange={(e) => setArgument(e.target.value)}
              placeholder={
                currentRound === 1
                  ? "State your case..."
                  : "Build on your argument..."
              }
              rows={4}
              disabled={loading || showRoundFlash}
              className="w-full bg-white/[0.04] rounded-2xl p-5 text-[15px] leading-relaxed font-light placeholder:text-dark/25 focus:outline-none focus:ring-1 focus:ring-white/10 resize-none transition-all disabled:opacity-50"
            />
            <div className="flex items-center justify-between mt-4">
              <span
                className={`text-xs ${
                  wordCount > 150 ? "text-accent-red" : "text-muted"
                }`}
              >
                {wordCount} / 150 words
              </span>
              <button
                onClick={handleSubmitArgument}
                disabled={wordCount < 5 || wordCount > 150 || loading || showRoundFlash}
                className="bg-dark text-cream px-8 py-3 rounded-full font-sans text-[11px] font-medium tracking-[2px] uppercase cursor-pointer transition-all duration-350 ease-smooth hover:scale-[1.04] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                    AI is thinking...
                  </span>
                ) : (
                  "Submit Argument"
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Completed State */
          <div className="mt-10 pt-8 border-t border-white/[0.08] text-center">
            <p className="font-serif italic text-xl mb-6 text-muted">
              Debate complete.
            </p>
            <Link
              href="/feed"
              className="inline-flex items-center gap-2.5 bg-dark text-cream px-8 py-4 rounded-full font-sans text-xs font-medium tracking-[2px] uppercase no-underline cursor-pointer transition-all duration-350 ease-smooth hover:scale-[1.06] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)]"
            >
              Publish to Feed &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
