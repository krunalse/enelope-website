-- Fixes a Day 5 QA finding: 0001_init.sql created the service-images and
-- testimonial-avatars buckets, but never added RLS policies on
-- storage.objects for them. Supabase's `public: true` bucket flag only
-- controls whether reads can use the public URL scheme without a signed
-- URL — it does NOT grant read/write access; storage.objects still has RLS
-- enabled by default, so without these policies every upload from the
-- admin panel fails with "new row violates row-level security policy".
--
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create policy "Public can read service images"
  on storage.objects for select
  using (bucket_id = 'service-images');

create policy "Authenticated users manage service images"
  on storage.objects for all
  using (bucket_id = 'service-images' and auth.role() = 'authenticated')
  with check (bucket_id = 'service-images' and auth.role() = 'authenticated');

create policy "Public can read testimonial avatars"
  on storage.objects for select
  using (bucket_id = 'testimonial-avatars');

create policy "Authenticated users manage testimonial avatars"
  on storage.objects for all
  using (bucket_id = 'testimonial-avatars' and auth.role() = 'authenticated')
  with check (bucket_id = 'testimonial-avatars' and auth.role() = 'authenticated');
