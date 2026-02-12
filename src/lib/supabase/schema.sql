-- ==================== DEBATE ME — DATABASE SCHEMA ====================
-- Run this in the Supabase SQL Editor to set up the database.

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ==================== USERS ====================
-- Extends Supabase auth.users with app-specific profile data
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  email text unique not null,
  avatar_color text not null default '#2a5cff',
  elo_rating integer not null default 1200,
  wins integer not null default 0,
  losses integer not null default 0,
  streak integer not null default 0,
  best_streak integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.users for select using (true);

create policy "Users can update own profile"
  on public.users for update using (auth.uid() = id);

-- ==================== DEBATES ====================
create table public.debates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  topic text not null,
  category text not null default 'life',
  status text not null default 'active' check (status in ('active', 'completed')),
  created_at timestamptz not null default now()
);

alter table public.debates enable row level security;

create policy "Debates are viewable by everyone"
  on public.debates for select using (true);

create policy "Authenticated users can create debates"
  on public.debates for insert with check (auth.uid() = user_id);

create policy "Users can update own debates"
  on public.debates for update using (auth.uid() = user_id);

-- ==================== ROUNDS ====================
create table public.rounds (
  id uuid default uuid_generate_v4() primary key,
  debate_id uuid references public.debates(id) on delete cascade not null,
  round_number integer not null check (round_number between 1 and 3),
  user_argument text not null,
  ai_argument text not null,
  created_at timestamptz not null default now(),
  unique(debate_id, round_number)
);

alter table public.rounds enable row level security;

create policy "Rounds are viewable by everyone"
  on public.rounds for select using (true);

create policy "Debate owner can insert rounds"
  on public.rounds for insert with check (
    auth.uid() = (select user_id from public.debates where id = debate_id)
  );

-- ==================== VOTES ====================
create table public.votes (
  id uuid default uuid_generate_v4() primary key,
  debate_id uuid references public.debates(id) on delete cascade not null,
  voter_id uuid references public.users(id) on delete cascade not null,
  vote_for text not null check (vote_for in ('human', 'ai')),
  created_at timestamptz not null default now(),
  unique(debate_id, voter_id) -- one vote per user per debate
);

alter table public.votes enable row level security;

create policy "Votes are viewable by everyone"
  on public.votes for select using (true);

create policy "Authenticated users can vote"
  on public.votes for insert with check (auth.uid() = voter_id);

-- ==================== BADGES ====================
create table public.badges (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  badge_type text not null,
  earned_at timestamptz not null default now(),
  unique(user_id, badge_type)
);

alter table public.badges enable row level security;

create policy "Badges are viewable by everyone"
  on public.badges for select using (true);

-- ==================== INDEXES ====================
create index idx_debates_user_id on public.debates(user_id);
create index idx_debates_status on public.debates(status);
create index idx_debates_category on public.debates(category);
create index idx_debates_created_at on public.debates(created_at desc);
create index idx_rounds_debate_id on public.rounds(debate_id);
create index idx_votes_debate_id on public.votes(debate_id);
create index idx_votes_voter_id on public.votes(voter_id);
create index idx_badges_user_id on public.badges(user_id);
create index idx_users_elo on public.users(elo_rating desc);

-- ==================== HELPER FUNCTIONS ====================

-- Get vote percentages for a debate
create or replace function get_debate_votes(d_id uuid)
returns table(total_votes bigint, human_pct numeric, ai_pct numeric)
language sql stable
as $$
  select
    count(*) as total_votes,
    round(100.0 * count(*) filter (where vote_for = 'human') / greatest(count(*), 1), 1) as human_pct,
    round(100.0 * count(*) filter (where vote_for = 'ai') / greatest(count(*), 1), 1) as ai_pct
  from public.votes
  where debate_id = d_id;
$$;
