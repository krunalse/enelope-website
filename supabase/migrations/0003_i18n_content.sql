-- Adds per-language content for services and testimonials (EN/DE/FR/IT).
-- Additive only — does not touch or drop any existing column. The old
-- services.title/short_description/full_description and
-- testimonials.testimonial/customer_role columns are left in place,
-- unused going forward, so this migration can't destroy existing data.
-- Run this in the Supabase SQL editor (or via `supabase db push`), after
-- 0001_init.sql and 0002_storage_policies.sql.

create table if not exists service_translations (
  service_id uuid not null references services(id) on delete cascade,
  locale text not null check (locale in ('en', 'de', 'fr', 'it')),
  title text,
  short_description text,
  full_description text,
  primary key (service_id, locale)
);

alter table service_translations enable row level security;

create policy "Public can read service translations"
  on service_translations for select
  using (true);

create policy "Authenticated users manage service translations"
  on service_translations for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create table if not exists testimonial_translations (
  testimonial_id uuid not null references testimonials(id) on delete cascade,
  locale text not null check (locale in ('en', 'de', 'fr', 'it')),
  testimonial text,
  customer_role text,
  primary key (testimonial_id, locale)
);

alter table testimonial_translations enable row level security;

create policy "Public can read testimonial translations"
  on testimonial_translations for select
  using (true);

create policy "Authenticated users manage testimonial translations"
  on testimonial_translations for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Backfill: every existing service/testimonial gets an 'en' translation
-- row copied from its current base-table text, so nothing goes blank.
insert into service_translations (service_id, locale, title, short_description, full_description)
select id, 'en', title, short_description, full_description
from services
on conflict (service_id, locale) do nothing;

insert into testimonial_translations (testimonial_id, locale, testimonial, customer_role)
select id, 'en', testimonial, customer_role
from testimonials
on conflict (testimonial_id, locale) do nothing;
