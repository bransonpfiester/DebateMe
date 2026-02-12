/**
 * Elo rating calculation for Debate Me.
 *
 * The "opponent" is effectively the AI, but the outcome is determined
 * by community vote percentage. We use a modified Elo where:
 * - If human gets >50% votes → human wins (score = 1)
 * - If AI gets >50% votes → human loses (score = 0)
 * - Exact 50/50 → draw (score = 0.5)
 *
 * K-factor: 32 (standard for new/active players)
 * AI baseline Elo: 1500 (fixed, representing a strong debater)
 */

const K_FACTOR = 32;
const AI_ELO = 1500;

/**
 * Calculate expected score using Elo formula.
 */
function expectedScore(playerElo: number, opponentElo: number): number {
  return 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
}

/**
 * Calculate new Elo rating after a debate.
 * @param currentElo - The human player's current Elo
 * @param humanVotePct - Percentage of votes for human (0-100)
 * @returns New Elo rating (integer)
 */
export function calculateNewElo(
  currentElo: number,
  humanVotePct: number
): number {
  // Determine score: win = 1, loss = 0, draw = 0.5
  let score: number;
  if (humanVotePct > 50) {
    score = 1;
  } else if (humanVotePct < 50) {
    score = 0;
  } else {
    score = 0.5;
  }

  const expected = expectedScore(currentElo, AI_ELO);
  const newElo = currentElo + K_FACTOR * (score - expected);

  // Floor at 100 to prevent negative-feeling ratings
  return Math.max(100, Math.round(newElo));
}

/**
 * Determine if the human won based on vote percentage.
 */
export function didHumanWin(humanVotePct: number): boolean {
  return humanVotePct > 50;
}
