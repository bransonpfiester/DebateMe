import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a world-class debater participating in a competitive debate platform called "Debate Me." Your role is to argue AGAINST the human's position with intellectual rigor, evidence, and rhetorical precision.

RULES:
1. Always steelman your position — argue the strongest possible version of the opposing case
2. Never strawman the human's argument — engage honestly with their actual points
3. Use concrete evidence, logical reasoning, and compelling rhetoric
4. Keep responses between 80-150 words — concise and punchy, not academic
5. Match the tone — if they're casual, be casual but sharp. If formal, match it.
6. Each round should build on previous arguments, not repeat them
7. Acknowledge strong points the human makes, then counter them
8. Be respectful but confident — you're here to win

You will receive the debate topic, which round this is, and the full conversation history.`;

interface DebateContext {
  topic: string;
  roundNumber: number;
  previousRounds: { userArgument: string; aiArgument: string }[];
  currentUserArgument: string;
}

/**
 * Generate an AI counter-argument for a debate round.
 * Cost guard: max_tokens capped at 300 to prevent runaway costs.
 * Estimated cost per call: ~$0.003 (input) + ~$0.005 (output) = ~$0.008
 * At 100 debates/day * 3 rounds = 300 calls * $0.008 = ~$2.40/day max
 */
export async function generateAiArgument(
  context: DebateContext
): Promise<string> {
  const conversationHistory: Anthropic.MessageParam[] = [];

  // Build conversation history from previous rounds
  for (const round of context.previousRounds) {
    conversationHistory.push({
      role: "user",
      content: round.userArgument,
    });
    conversationHistory.push({
      role: "assistant",
      content: round.aiArgument,
    });
  }

  // Add current round's user argument
  conversationHistory.push({
    role: "user",
    content: `[Round ${context.roundNumber} of 3 — Topic: "${context.topic}"]\n\n${context.currentUserArgument}`,
  });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages: conversationHistory,
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  return textBlock.text;
}
