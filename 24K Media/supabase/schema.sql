-- 24K Media — Supabase schema
-- Run this in your Supabase project: Dashboard → SQL Editor → New query → paste → Run.
-- It is safe to run more than once (idempotent).

-- ─────────────────────────────────────────────────────────────
-- leads: captures "Book Growth Call" / contact-form submissions.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  company     text default '',
  revenue     text default '',
  goal        text default '',
  budget      text default '',
  message     text default '',
  source      text default '24kmedia.in/contact',
  created_at  timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Row Level Security: ON. The Express API writes with the service_role key,
-- which bypasses RLS. With no public policies, anon/public clients cannot
-- read or write this table directly — leads stay private.
alter table public.leads enable row level security;

-- (Optional) If you ever want the browser to insert leads directly with the
-- anon/publishable key (no Express server), uncomment the policy below.
-- It allows INSERT only — never SELECT — so visitors can submit but not read.
--
-- drop policy if exists "anon can insert leads" on public.leads;
-- create policy "anon can insert leads"
--   on public.leads for insert
--   to anon
--   with check (true);
