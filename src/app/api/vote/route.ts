import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { calculateNewElo, didHumanWin } from "@/lib/elo";
import type { SubmitVotePayload } from "@/types";

/**
 * POST /api/vote — Vote on a debate
 *
 * After voting, recalculates the debate owner's Elo rating.
 * One vote per user per debate (enforced by DB unique constraint).
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: SubmitVotePayload = await request.json();

    if (!body.debate_id || !body.vote_for) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (body.vote_for !== "human" && body.vote_for !== "ai") {
      return NextResponse.json(
        { error: "vote_for must be 'human' or 'ai'" },
        { status: 400 }
      );
    }

    // Verify debate exists and is completed
    const { data: debate, error: debateError } = await supabase
      .from("debates")
      .select("*")
      .eq("id", body.debate_id)
      .eq("status", "completed")
      .single();

    if (debateError || !debate) {
      return NextResponse.json(
        { error: "Debate not found or not completed" },
        { status: 404 }
      );
    }

    // Prevent self-voting
    if (debate.user_id === user.id) {
      return NextResponse.json(
        { error: "Cannot vote on your own debate" },
        { status: 403 }
      );
    }

    // Insert vote (unique constraint prevents duplicates)
    const { error: voteError } = await supabase.from("votes").insert({
      debate_id: body.debate_id,
      voter_id: user.id,
      vote_for: body.vote_for,
    });

    if (voteError) {
      if (voteError.code === "23505") {
        return NextResponse.json(
          { error: "Already voted on this debate" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: voteError.message },
        { status: 500 }
      );
    }

    // Recalculate vote percentages
    const { data: votes } = await supabase
      .from("votes")
      .select("vote_for")
      .eq("debate_id", body.debate_id);

    if (votes && votes.length > 0) {
      const humanVotes = votes.filter((v) => v.vote_for === "human").length;
      const humanPct = (humanVotes / votes.length) * 100;

      // Update debate owner's Elo (every 5 votes to avoid constant recalculation)
      if (votes.length % 5 === 0) {
        const { data: debateOwner } = await supabase
          .from("users")
          .select("elo_rating, wins, losses, streak, best_streak")
          .eq("id", debate.user_id)
          .single();

        if (debateOwner) {
          const newElo = calculateNewElo(debateOwner.elo_rating, humanPct);
          const won = didHumanWin(humanPct);
          const newStreak = won ? debateOwner.streak + 1 : 0;

          await supabase
            .from("users")
            .update({
              elo_rating: newElo,
              wins: won ? debateOwner.wins + 1 : debateOwner.wins,
              losses: won ? debateOwner.losses : debateOwner.losses + 1,
              streak: newStreak,
              best_streak: Math.max(newStreak, debateOwner.best_streak),
            })
            .eq("id", debate.user_id);
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
