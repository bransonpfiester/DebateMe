/* ==================== DATABASE TYPES ==================== */

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_color: string;
  elo_rating: number;
  wins: number;
  losses: number;
  streak: number;
  best_streak: number;
  created_at: string;
}

export interface Debate {
  id: string;
  user_id: string;
  topic: string;
  category: DebateCategory;
  status: "active" | "completed";
  created_at: string;
  /* Joined fields */
  user?: User;
  rounds?: Round[];
  vote_count?: number;
  human_vote_pct?: number;
  ai_vote_pct?: number;
}

export interface Round {
  id: string;
  debate_id: string;
  round_number: 1 | 2 | 3;
  user_argument: string;
  ai_argument: string;
  created_at: string;
}

export interface Vote {
  id: string;
  debate_id: string;
  voter_id: string;
  vote_for: "human" | "ai";
  created_at: string;
}

export interface Badge {
  id: string;
  user_id: string;
  badge_type: BadgeType;
  earned_at: string;
}

/* ==================== ENUMS ==================== */

export type DebateCategory =
  | "food"
  | "tech"
  | "philosophy"
  | "sports"
  | "life"
  | "education"
  | "pop-culture";

export type BadgeType =
  | "first-blood"
  | "on-fire"
  | "ai-slayer"
  | "crowd-favorite"
  | "philosopher"
  | "streak-5"
  | "streak-10"
  | "debates-10"
  | "debates-50"
  | "votes-100";

export const BADGE_INFO: Record<
  BadgeType,
  { name: string; emoji: string; description: string }
> = {
  "first-blood": {
    name: "First Blood",
    emoji: "⚔️",
    description: "Win your first debate",
  },
  "on-fire": {
    name: "On Fire",
    emoji: "🔥",
    description: "Win 3 debates in a row",
  },
  "ai-slayer": {
    name: "AI Slayer",
    emoji: "🤖",
    description: "Win 10 debates against AI",
  },
  "crowd-favorite": {
    name: "Crowd Favorite",
    emoji: "👑",
    description: "Get 100+ votes on a single debate",
  },
  philosopher: {
    name: "Philosopher",
    emoji: "🏛️",
    description: "Win 5 philosophy debates",
  },
  "streak-5": {
    name: "Hot Streak",
    emoji: "💥",
    description: "Win 5 debates in a row",
  },
  "streak-10": {
    name: "Unstoppable",
    emoji: "⚡",
    description: "Win 10 debates in a row",
  },
  "debates-10": {
    name: "Regular",
    emoji: "🎯",
    description: "Complete 10 debates",
  },
  "debates-50": {
    name: "Veteran",
    emoji: "🏆",
    description: "Complete 50 debates",
  },
  "votes-100": {
    name: "Popular",
    emoji: "📢",
    description: "Receive 100 total votes",
  },
};

export const CATEGORIES: { value: DebateCategory; label: string }[] = [
  { value: "food", label: "Food" },
  { value: "tech", label: "Tech" },
  { value: "philosophy", label: "Philosophy" },
  { value: "sports", label: "Sports" },
  { value: "life", label: "Life" },
  { value: "education", label: "Education" },
  { value: "pop-culture", label: "Pop Culture" },
];

/* ==================== API TYPES ==================== */

export interface CreateDebatePayload {
  topic: string;
  category: DebateCategory;
}

export interface SubmitArgumentPayload {
  debate_id: string;
  round_number: number;
  user_argument: string;
}

export interface SubmitVotePayload {
  debate_id: string;
  vote_for: "human" | "ai";
}

/* ==================== FEED FILTERS ==================== */

export type FeedFilter =
  | "all"
  | "trending"
  | "upsets"
  | DebateCategory;

export const FEED_FILTERS: { value: FeedFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "trending", label: "Trending" },
  { value: "upsets", label: "Biggest Upsets" },
  { value: "food", label: "Food" },
  { value: "tech", label: "Tech" },
  { value: "philosophy", label: "Philosophy" },
  { value: "sports", label: "Sports" },
  { value: "life", label: "Life" },
];
