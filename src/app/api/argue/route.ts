import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { generateAiArgument } from "@/lib/claude";
import type { SubmitArgumentPayload } from "@/types";

/**
 * POST /api/argue — Submit a human argument and get AI response
 *
 * Rate limit guard: one round per debate at a time (enforced by unique constraint).
 * Cost guard: max 3 rounds per debate, max_tokens=300 per Claude call.
 * Max cost per debate: 3 * ~$0.008 = ~$0.024
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

    const body: SubmitArgumentPayload = await request.json();

    if (!body.debate_id || !body.user_argument || !body.round_number) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (body.round_number < 1 || body.round_number > 3) {
      return NextResponse.json(
        { error: "Round number must be 1, 2, or 3" },
        { status: 400 }
      );
    }

    if (body.user_argument.trim().length < 10) {
      return NextResponse.json(
        { error: "Argument must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Word count limit: 150 words
    const wordCount = body.user_argument.trim().split(/\s+/).length;
    if (wordCount > 150) {
      return NextResponse.json(
        { error: "Argument must be 150 words or fewer" },
        { status: 400 }
      );
    }

    // Verify debate ownership
    const { data: debate, error: debateError } = await supabase
      .from("debates")
      .select("*")
      .eq("id", body.debate_id)
      .eq("user_id", user.id)
      .single();

    if (debateError || !debate) {
      return NextResponse.json(
        { error: "Debate not found or not yours" },
        { status: 404 }
      );
    }

    if (debate.status !== "active") {
      return NextResponse.json(
        { error: "Debate is already completed" },
        { status: 400 }
      );
    }

    // Fetch previous rounds for context
    const { data: previousRounds } = await supabase
      .from("rounds")
      .select("*")
      .eq("debate_id", body.debate_id)
      .order("round_number", { ascending: true });

    // Generate AI response
    const aiArgument = await generateAiArgument({
      topic: debate.topic,
      roundNumber: body.round_number,
      previousRounds: (previousRounds || []).map((r) => ({
        userArgument: r.user_argument,
        aiArgument: r.ai_argument,
      })),
      currentUserArgument: body.user_argument.trim(),
    });

    // Save the round
    const { data: round, error: roundError } = await supabase
      .from("rounds")
      .insert({
        debate_id: body.debate_id,
        round_number: body.round_number,
        user_argument: body.user_argument.trim(),
        ai_argument: aiArgument,
      })
      .select()
      .single();

    if (roundError) {
      return NextResponse.json(
        { error: roundError.message },
        { status: 500 }
      );
    }

    // If this was round 3, mark debate as completed
    if (body.round_number === 3) {
      await supabase
        .from("debates")
        .update({ status: "completed" })
        .eq("id", body.debate_id);
    }

    return NextResponse.json(round, { status: 201 });
  } catch (err) {
    console.error("Argue API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
