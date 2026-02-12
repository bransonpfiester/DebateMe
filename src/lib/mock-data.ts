/**
 * Mock data for development before Supabase is connected.
 * Remove this file once the database is live.
 */

import { Debate, User, Round, DebateCategory } from "@/types";

export const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "sophist_king",
    email: "sophist@example.com",
    avatar_color: "#2a5cff",
    elo_rating: 1847,
    wins: 142,
    losses: 31,
    streak: 7,
    best_streak: 12,
    created_at: "2025-06-15T00:00:00Z",
  },
  {
    id: "2",
    username: "argue_with_me",
    email: "argue@example.com",
    avatar_color: "#e03e36",
    elo_rating: 1793,
    wins: 98,
    losses: 24,
    streak: 3,
    best_streak: 9,
    created_at: "2025-07-01T00:00:00Z",
  },
  {
    id: "3",
    username: "rhetoric_404",
    email: "rhetoric@example.com",
    avatar_color: "#D4A017",
    elo_rating: 1756,
    wins: 87,
    losses: 29,
    streak: 1,
    best_streak: 8,
    created_at: "2025-08-10T00:00:00Z",
  },
  {
    id: "4",
    username: "devil_advocate",
    email: "devil@example.com",
    avatar_color: "#64dca0",
    elo_rating: 1721,
    wins: 64,
    losses: 22,
    streak: 5,
    best_streak: 7,
    created_at: "2025-09-01T00:00:00Z",
  },
  {
    id: "5",
    username: "no_u_actually",
    email: "nou@example.com",
    avatar_color: "#a78bfa",
    elo_rating: 1698,
    wins: 53,
    losses: 19,
    streak: 2,
    best_streak: 6,
    created_at: "2025-09-20T00:00:00Z",
  },
];

export const MOCK_DEBATES: (Debate & {
  user: User;
  rounds: Round[];
  vote_count: number;
  human_vote_pct: number;
  ai_vote_pct: number;
})[] = [
  {
    id: "d1",
    user_id: "1",
    topic: "Pineapple belongs on pizza.",
    category: "food" as DebateCategory,
    status: "completed",
    created_at: "2026-02-11T14:30:00Z",
    user: MOCK_USERS[0],
    rounds: [
      {
        id: "r1",
        debate_id: "d1",
        round_number: 1 as const,
        user_argument:
          "The sweet-savory contrast of pineapple with salty ham and tangy tomato sauce creates a flavor profile that's fundamentally more complex than any traditional topping. Hawaiian pizza outsells most specialty pizzas for a reason.",
        ai_argument:
          "Popularity isn't culinary merit — it's accessibility. Pineapple releases moisture during baking that compromises dough integrity and dilutes the Maillard reaction on cheese. The sweetness overrides the balance Italian cuisine spent centuries perfecting.",
        created_at: "2026-02-11T14:31:00Z",
      },
      {
        id: "r2",
        debate_id: "d1",
        round_number: 2 as const,
        user_argument:
          "Italian cuisine is not static — it evolved through centuries of foreign influence. Tomatoes came from the Americas and were once considered poison. Innovation is tradition. And the moisture argument is solved by proper prep: salt, drain, pat dry.",
        ai_argument:
          "You're conflating historical ingredient adoption with toppings that fight the dish's architecture. Tomatoes were adapted to become foundational sauces. Pineapple remains a topping that requires workarounds to not sabotage texture. If you need to pre-process an ingredient to make it work, it doesn't belong.",
        created_at: "2026-02-11T14:35:00Z",
      },
      {
        id: "r3",
        debate_id: "d1",
        round_number: 3 as const,
        user_argument:
          "By that logic, you'd reject marinated meats, fermented cheeses, and reduced sauces — all 'pre-processed.' Cooking IS processing ingredients to make them work. The real question is taste, and millions of people vote with their wallets every day.",
        ai_argument:
          "There's a difference between processing that enhances and processing that compensates for a flaw. Marinating meat adds depth; draining pineapple removes damage. And the market argument cuts both ways — fast food outsells fine dining, but no one calls a Big Mac haute cuisine.",
        created_at: "2026-02-11T14:40:00Z",
      },
    ],
    vote_count: 847,
    human_vote_pct: 62,
    ai_vote_pct: 38,
  },
  {
    id: "d2",
    user_id: "2",
    topic: "Remote work is strictly better than office work.",
    category: "life" as DebateCategory,
    status: "completed",
    created_at: "2026-02-11T10:00:00Z",
    user: MOCK_USERS[1],
    rounds: [
      {
        id: "r4",
        debate_id: "d2",
        round_number: 1 as const,
        user_argument:
          "Remote work eliminates commuting, gives workers schedule flexibility, and study after study shows productivity increases. Companies save on office space, workers save on gas and clothes. It's a win-win that the pandemic proved works at scale.",
        ai_argument:
          "Productivity metrics in those studies measure output, not innovation. Serendipitous hallway conversations, whiteboard sessions, and body-language-rich meetings drive creative breakthroughs that Zoom calls can't replicate. Remote work optimizes for individual tasks while degrading collaborative intelligence.",
        created_at: "2026-02-11T10:01:00Z",
      },
      {
        id: "r5",
        debate_id: "d2",
        round_number: 2 as const,
        user_argument:
          "The 'hallway conversation' argument romanticizes interruptions. Deep work requires focus, and open offices are distraction factories. Digital tools like Slack, Miro, and Figma enable asynchronous collaboration that's actually more inclusive — introverts and non-native speakers thrive.",
        ai_argument:
          "Asynchronous collaboration works for execution but not for ideation. Brainstorming requires real-time energy, reading the room, and building momentum. And the 'inclusivity' argument ignores that remote work exacerbates isolation, weakens mentorship, and makes career advancement dependent on self-promotion rather than visible contribution.",
        created_at: "2026-02-11T10:05:00Z",
      },
      {
        id: "r6",
        debate_id: "d2",
        round_number: 3 as const,
        user_argument:
          "Career advancement in offices was already broken — it favored extroverts and people who sat near the boss. Remote work forces companies to evaluate actual output. And isolation is a choice: remote workers can build community through coworking spaces, local meetups, and intentional team retreats.",
        ai_argument:
          "If remote workers need coworking spaces and retreats to avoid isolation, you've just reinvented the office with extra steps and less structure. The fundamental issue isn't location — it's that human connection requires physical presence for depth. Remote-first companies like GitLab spend millions on offsites because they know screens aren't enough.",
        created_at: "2026-02-11T10:10:00Z",
      },
    ],
    vote_count: 523,
    human_vote_pct: 44,
    ai_vote_pct: 56,
  },
  {
    id: "d3",
    user_id: "3",
    topic: "College degrees are becoming obsolete.",
    category: "education" as DebateCategory,
    status: "completed",
    created_at: "2026-02-10T18:00:00Z",
    user: MOCK_USERS[2],
    rounds: [
      {
        id: "r7",
        debate_id: "d3",
        round_number: 1 as const,
        user_argument:
          "Tech companies are dropping degree requirements — Google, Apple, Tesla. Bootcamps teach job-ready skills in months, not years. The average student graduates with $30k in debt for a degree that doesn't guarantee employment. The ROI is broken.",
        ai_argument:
          "Cherry-picking tech giants ignores that 65% of job postings still require degrees. A bachelor's degree holder earns $1.2M more over a lifetime than a high school graduate. Bootcamps teach narrow skills that automate; degrees teach critical thinking, adaptability, and signal commitment to employers across every industry.",
        created_at: "2026-02-10T18:01:00Z",
      },
      {
        id: "r8",
        debate_id: "d3",
        round_number: 2 as const,
        user_argument:
          "That $1.2M figure compares degree holders to high school graduates, not to self-educated professionals. And 'signaling commitment' is just gatekeeping dressed up as virtue. The actual skills gap proves degrees don't teach what employers need — that's why companies spend billions on internal training.",
        ai_argument:
          "Internal training supplements domain-specific knowledge; it doesn't replace foundational education. Doctors, engineers, lawyers, teachers — these fields require structured education for good reason. The 'self-educated professional' path works for a small, highly motivated minority. Policy shouldn't be built around survivorship bias.",
        created_at: "2026-02-10T18:05:00Z",
      },
      {
        id: "r9",
        debate_id: "d3",
        round_number: 3 as const,
        user_argument:
          "No one's arguing against medical school. The claim is about the blanket necessity of 4-year degrees for the majority of careers. When a marketing coordinator needs a $120k degree to get hired for a job they'll learn on-the-job anyway, the system is broken — not the people questioning it.",
        ai_argument:
          "Then the reform is cheaper, more accessible degrees — not abolishing the institution. Community colleges, income-share agreements, and employer-sponsored education fix the cost problem while preserving the structured learning environment that self-directed paths lack. The degree isn't obsolete; the pricing model is.",
        created_at: "2026-02-10T18:10:00Z",
      },
    ],
    vote_count: 1203,
    human_vote_pct: 71,
    ai_vote_pct: 29,
  },
  {
    id: "d4",
    user_id: "4",
    topic: "AI art is real art.",
    category: "tech" as DebateCategory,
    status: "completed",
    created_at: "2026-02-10T12:00:00Z",
    user: MOCK_USERS[3],
    rounds: [
      {
        id: "r10",
        debate_id: "d4",
        round_number: 1 as const,
        user_argument:
          "Art is defined by the emotional response it creates, not the tool used. Photography was called 'not real art' too. AI is a tool — the human provides the vision, the prompt, the curation. The output can be breathtaking, thought-provoking, and deeply personal.",
        ai_argument:
          "Photography requires understanding light, composition, timing, and physical skill. Typing a prompt requires none of that embodied knowledge. Art has always been about mastery of craft meeting creative vision. AI art removes the craft entirely, leaving only vague creative direction — which is more like being an art director than an artist.",
        created_at: "2026-02-10T12:01:00Z",
      },
      {
        id: "r11",
        debate_id: "d4",
        round_number: 2 as const,
        user_argument:
          "Prompt engineering IS a skill — achieving a specific vision through AI requires iterating, combining techniques, understanding model behavior. And since when does art require physical suffering? Duchamp put a urinal in a gallery. Warhol used screen printing. The definition of art expands with every generation.",
        ai_argument:
          "Duchamp and Warhol had decades of traditional training and made deliberate conceptual statements about art itself. They earned the right to challenge conventions by first mastering them. Most AI art isn't a commentary on the medium — it's someone who can't draw asking a machine to draw for them and calling the result 'theirs.'",
        created_at: "2026-02-10T12:05:00Z",
      },
      {
        id: "r12",
        debate_id: "d4",
        round_number: 3 as const,
        user_argument:
          "Gatekeeping art behind 'earning the right' is elitist. Art should be democratized. If a teenager with no formal training uses AI to express grief, joy, or identity in a way that moves people — that's art. Period. The human experience behind it is what matters, not the tool in their hand.",
        ai_argument:
          "Democratizing creation is wonderful; calling all output 'art' dilutes the word. A child's crayon drawing is art because they made every mark. AI-generated output is creation by proxy — the model makes thousands of aesthetic decisions the human never made. We should celebrate AI as a powerful new medium without pretending the human contribution is equivalent to hand-made craft.",
        created_at: "2026-02-10T12:10:00Z",
      },
    ],
    vote_count: 956,
    human_vote_pct: 48,
    ai_vote_pct: 52,
  },
  {
    id: "d5",
    user_id: "5",
    topic: "Social media does more harm than good.",
    category: "philosophy" as DebateCategory,
    status: "completed",
    created_at: "2026-02-09T20:00:00Z",
    user: MOCK_USERS[4],
    rounds: [
      {
        id: "r13",
        debate_id: "d5",
        round_number: 1 as const,
        user_argument:
          "Teen depression has skyrocketed since 2012 — the year smartphones became ubiquitous. Social media creates comparison traps, echo chambers, and attention addiction. It's rewiring our brains for short-term dopamine hits instead of deep thinking and real connection.",
        ai_argument:
          "Correlation isn't causation — teen depression also correlates with economic anxiety, school pressure, and reduced outdoor time. Social media has given voice to marginalized communities, enabled revolutions, connected families across continents, and built support networks for people with rare conditions who'd otherwise feel completely alone.",
        created_at: "2026-02-09T20:01:00Z",
      },
      {
        id: "r14",
        debate_id: "d5",
        round_number: 2 as const,
        user_argument:
          "The positive use cases you describe could exist without algorithmic feeds designed to maximize engagement through outrage. The problem isn't connection — it's that platforms are engineered to exploit psychological vulnerabilities for ad revenue. Facebook's own research showed Instagram harms teen girls. They buried it.",
        ai_argument:
          "Then the argument is against specific business models, not social media as a concept. Regulation, not abolition, is the answer. We don't argue that 'television does more harm than good' because some channels air junk — we create PBS and the FCC. Social media needs better guardrails, not a wholesale condemnation of the most powerful communication tool since the printing press.",
        created_at: "2026-02-09T20:05:00Z",
      },
      {
        id: "r15",
        debate_id: "d5",
        round_number: 3 as const,
        user_argument:
          "The printing press didn't have an algorithm optimizing for your worst impulses. And regulation hasn't worked — COPPA exists, yet kids flood TikTok. The incentive structure is fundamentally broken: these companies profit from harm. Until that changes, the net effect is negative, especially for the most vulnerable users.",
        ai_argument:
          "By that logic, fast food does more harm than good because companies profit from unhealthy eating and regulation hasn't eliminated childhood obesity. The framework of 'does more harm than good' requires actually tallying both sides — and when you count every small business built on Instagram, every protest organized on Twitter, every lonely person who found their community, the ledger isn't as simple as your framing suggests.",
        created_at: "2026-02-09T20:10:00Z",
      },
    ],
    vote_count: 678,
    human_vote_pct: 58,
    ai_vote_pct: 42,
  },
];

export const DAILY_PROMPT = "Is college still worth it?";

export function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
