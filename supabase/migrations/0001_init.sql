-- Enelope website: Day 2/3 schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "uuid-ossp";

-- ─────────────────────────────
-- services
-- ─────────────────────────────
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  short_description text not null,
  full_description text not null,
  icon text not null default 'Bot',
  image_url text,
  image_path text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table services enable row level security;

-- Public can read only active services
create policy "Public can read active services"
  on services for select
  using (is_active = true);

-- Authenticated (admin) users can do everything
create policy "Authenticated users manage services"
  on services for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────
-- testimonials
-- ─────────────────────────────
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  customer_role text not null,
  company_name text not null,
  testimonial text not null,
  avatar_url text,
  avatar_path text,
  rating int not null default 5 check (rating between 1 and 5),
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "Public can read active testimonials"
  on testimonials for select
  using (is_active = true);

create policy "Authenticated users manage testimonials"
  on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────
-- updated_at triggers
-- ─────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger services_set_updated_at
  before update on services
  for each row execute procedure set_updated_at();

create trigger testimonials_set_updated_at
  before update on testimonials
  for each row execute procedure set_updated_at();

-- ─────────────────────────────
-- Storage buckets (run once)
-- ─────────────────────────────
insert into storage.buckets (id, name, public)
values ('service-images', 'service-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('testimonial-avatars', 'testimonial-avatars', true)
on conflict (id) do nothing;

-- ─────────────────────────────
-- Seed data (matches lib/data placeholders — safe to delete/edit)
-- ─────────────────────────────
insert into services (title, slug, short_description, full_description, icon, display_order, is_active)
values
  ('AI Agents', 'ai-agents', 'Autonomous agents that handle real work — research, triage, follow-ups — inside your existing tools.', 'We design and deploy AI agents that plug into your existing stack and take on multi-step work end to end.', 'Bot', 1, true),
  ('Chatbots', 'chatbots', 'Conversational assistants for support, sales, and internal knowledge — grounded in your own data.', 'From first response to resolution, we build chatbots that actually know your product.', 'MessageSquare', 2, true),
  ('Cloud', 'cloud', 'Cloud architecture and migrations built for the workloads AI adds to your infrastructure.', 'We design, migrate, and operate cloud infrastructure with modern AI workloads in mind.', 'Cloud', 3, true),
  ('Consulting', 'consulting', 'Independent advice on where AI actually fits your business, and where it doesn''t.', 'Before we build anything, we help you find the right problems to solve.', 'Compass', 4, true)
on conflict (slug) do nothing;
