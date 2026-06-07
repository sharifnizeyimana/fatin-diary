-- ─────────────────────────────────────────────
--  Fatin·diary  –  Supabase schema + RLS setup
--  Run this entire file in the Supabase SQL Editor
-- ─────────────────────────────────────────────

-- ENTRIES
create table if not exists entries (
  id          uuid primary key default gen_random_uuid(),
  title       text        not null,
  excerpt     text        not null default '',
  body        text        not null default '',
  category    text        not null default 'journey',
  mood        text        not null default '😊 Happy',
  tags        text[]      not null default '{}',
  image       text,
  pinned      boolean     not null default false,
  likes       integer     not null default 0,
  read_time   integer     not null default 1,
  date        date        not null default current_date,
  created_at  timestamptz not null default now()
);

alter table entries enable row level security;

create policy "public select entries"
  on entries for select using (true);

create policy "public insert entries"
  on entries for insert with check (true);

create policy "public update entries"
  on entries for update using (true);

create policy "public delete entries"
  on entries for delete using (true);

-- COMMENTS
create table if not exists comments (
  id          uuid primary key default gen_random_uuid(),
  entry_id    uuid        not null references entries(id) on delete cascade,
  author      text        not null,
  avatar      text        not null default '',
  text        text        not null,
  likes       integer     not null default 0,
  date        date        not null default current_date,
  created_at  timestamptz not null default now()
);

alter table comments enable row level security;

create policy "public select comments"
  on comments for select using (true);

create policy "public insert comments"
  on comments for insert with check (true);

create policy "public delete comments"
  on comments for delete using (true);

-- SUBSCRIBERS
create table if not exists subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text        not null unique,
  name        text        not null default '',
  active      boolean     not null default true,
  date        date        not null default current_date,
  created_at  timestamptz not null default now()
);

alter table subscribers enable row level security;

create policy "public select subscribers"
  on subscribers for select using (true);

create policy "public insert subscribers"
  on subscribers for insert with check (true);

create policy "public delete subscribers"
  on subscribers for delete using (true);

-- Enable realtime for comments
alter publication supabase_realtime add table comments;
