# Enelope Website

AI Agents · Chatbots · Cloud · Consulting — marketing site + lightweight admin.

Next.js (App Router) · TypeScript · Tailwind CSS · Supabase · Resend · Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Services and testimonials are both live from
Supabase now — you need a Supabase project and `.env.local` filled in (see
below) before the site or admin panel will work.

## Build status

| Day | Scope | Status |
|---|---|---|
| 1 | Full site UI (all public pages, placeholder data) | ✅ Done |
| 2 | Services → Supabase, service images, services admin | ✅ Done (code side — see setup below) |
| 3 | Testimonials → Supabase, testimonials admin, auth | ✅ Done (code side — see setup below) |
| 4 | Contact → Resend, SEO, final copy | ✅ Done — see below for what still needs a real value from you |
| 5 | Polish, responsive/functional testing, deploy | ✅ Polish + QA done — deployment intentionally not done this session |

### What Day 2 built
- Public pages (`/`, `/services`, `/services/[slug]`, `/contact`'s service
  dropdown) read live from Supabase via `lib/supabase/queries.ts`, using a
  cookie-free client so they stay statically generated / ISR'd (`revalidate
  = 60`) instead of forcing full dynamic rendering.
- `proxy.ts` + `lib/supabase/middleware.ts` refresh the Supabase session on
  every request and optimistically gate `/admin/*`. Every admin page and
  server action also calls `requireAdmin()` (`lib/supabase/admin-auth.ts`) —
  Proxy is a first line of defense, not the only one.
- Admin access is a login-only Supabase Auth flow, restricted to emails in
  `ADMIN_EMAILS` (comma-separated). There's no signup screen — create the
  admin user directly in the Supabase Auth dashboard.
- `/admin`, `/admin/services`, `/admin/services/new`, `/admin/services/[id]`
  — full CRUD: create, edit, delete, activate/deactivate, reorder
  (swaps `display_order` with the neighbor row), and image upload/replace
  to the `service-images` Storage bucket (old image is deleted on replace
  or delete).

### What Day 3 built
- Homepage testimonials section reads live from Supabase the same way
  services do (cookie-free client, `revalidate = 60`); `TestimonialCard`
  now renders the uploaded avatar when one exists.
- `/admin/testimonials`, `/admin/testimonials/new`, `/admin/testimonials/[id]`
  — same CRUD shape as services: create, edit, delete, activate/deactivate,
  reorder, avatar upload/replace to the `testimonial-avatars` bucket.
- The admin dashboard and nav now link to both Services and Testimonials.
  Shared bits (`SubmitButton`, `DeleteButton`) are reused between the two
  CRUD flows rather than duplicated.

### What Day 4 built
- Real Privacy Policy and Terms of Service copy (standard boilerplate naming
  Supabase/Resend/Vercel as subprocessors) — **have a lawyer review before
  this is your final legal text.**
- Site domain switched from the placeholder `enelope.com` to `enelope.ch`
  (metadata base, footer/contact copy, legal pages).
- `app/sitemap.ts` (includes live active-service URLs) and `app/robots.ts`
  (disallows `/admin` and `/api`).
- `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx` — generated
  with `next/og` (no image asset needed), since the site previously shipped
  with no favicon or social preview image at all.
- Swept all public copy for leftover placeholder text — none found outside
  the two legal pages above.

### What Day 5 found and fixed
Live QA against the real Supabase project (not just code review) turned up
two real bugs no amount of static review would have caught:
- **Image/avatar uploads were completely broken.** `0001_init.sql` created
  the `service-images` / `testimonial-avatars` Storage buckets but never
  added RLS policies on `storage.objects` for them — every upload failed
  with "new row violates row-level security policy". Fixed in
  `supabase/migrations/0002_storage_policies.sql` — **run this in your
  Supabase SQL editor** the same way you ran the first migration.
- **Uploads over ~1MB were rejected outright** — Next's default Server
  Action body limit is 1MB, well under any real phone photo. Raised to
  `10mb` in `next.config.mjs` (`experimental.serverActions.bodySizeLimit`).
- The admin services/testimonials list rows used `flex-wrap` in a way that
  didn't actually wrap at mobile widths — titles truncated to 1-2 characters
  instead of dropping to a second line. Fixed by restructuring each row into
  two flex groups (`flex-col sm:flex-row`) that stack cleanly under 640px.
- Minor: Hero's two-column entrance animation was asymmetric, an unused
  `trace-line` keyframe was dead code, `CTA.tsx` had unescaped apostrophes
  and a missing dark-mode opacity variant, and the mobile nav toggle was
  missing `aria-controls`. All fixed.

**Known gap, not fixed — needs a product decision:** uploaded service
images are stored and shown in the admin list, but `ServiceCard` and the
service detail page always render the lucide icon, never `image_url`. This
was true since Day 2; nothing in the public UI currently displays an
uploaded service image. Worth deciding whether that's intentional (icon-only
look) before relying on the upload feature for anything visible to visitors.

## Connecting Supabase (required for Day 2+)

1. Create a project at supabase.com.
2. In the SQL editor, run `supabase/migrations/0001_init.sql`, then
   `supabase/migrations/0002_storage_policies.sql` — creates `services` /
   `testimonials`, RLS policies, the storage buckets, and (0002) the storage
   object policies those buckets need to actually accept uploads.
3. Copy your Project URL and anon/publishable key into `.env.local`
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`).
4. In Supabase → Authentication → Users, manually create the admin user(s)
   you want to log in with.
5. Add those same email(s) to `ADMIN_EMAILS` in `.env.local`
   (comma-separated — this is the only authorization check, Supabase Auth
   itself has no built-in admin role here).
6. `npm run dev`, then sign in at `/admin/login`.

## Connecting Resend (Day 4)

1. Create an API key at resend.com and **verify enelope.ch as a sending
   domain** (DNS records) — `CONTACT_FROM_EMAIL` can only send from a domain
   Resend has verified.
2. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in
   `.env.local` (and in Vercel's project settings for production). Until
   `RESEND_API_KEY` is set, submissions are just logged to the server console.

### ⚠️ Things to fix in your env files before this is production-ready

- **`.env.example` currently contains real secrets** (a live Supabase
  service role key, project URL, and a personal email) instead of blank
  placeholders. `.env.example` is meant to be safe to commit; real values
  belong only in `.env.local` (already gitignored). Move/blank these out
  before this project is ever put under version control or shared.
- `CONTACT_TO_EMAIL` is currently `krunal.prajapati@enelope.com`, but
  `ADMIN_EMAILS` already uses the `.ch` address — confirm which inbox should
  actually receive contact form submissions and update to match.
- `CONTACT_FROM_EMAIL` is `noreply@enelope.com`. I didn't change this to
  `.ch` automatically, since it must match whatever domain you actually
  verify in Resend (step 1 above) — changing it without verifying `.ch`
  there would break sending.

## Still to build

- Deployment: GitHub → Vercel → Production, Vercel env vars, custom domain
  (deliberately not done this session — see Day 5 build plan step for the
  checklist when you're ready).

## Project structure

```
app/
  admin/
    login/            /admin/login — Supabase Auth sign-in
    (protected)/       auth-gated admin shell (layout calls requireAdmin())
      page.tsx          /admin dashboard
      services/         /admin/services CRUD + actions.ts (server actions)
      testimonials/     /admin/testimonials CRUD + actions.ts (server actions)
  services/           public /services, /services/[slug]
  contact/, about/, case-studies/, privacy/, terms/
  api/contact/         Resend-backed contact route
components/
  layout/       Navbar, Footer, ThemeToggle
  ui/           Button, Card, Badge, Container, SectionHeading
  sections/     homepage sections (Hero, Process, Testimonials, ...)
  services/     ServiceCard, ServiceGrid (public)
  testimonials/ TestimonialCard (public)
  admin/        LoginForm, ServiceForm, TestimonialForm, SubmitButton,
                DeleteButton, LogoutButton — shared across both CRUD flows
  forms/        ContactForm
lib/
  data/         Day 1 placeholder data (case studies only — services and
                testimonials both moved to Supabase)
  supabase/
    public.ts     cookie-free client for public reads (keeps pages static/ISR)
    server.ts     cookie-aware SSR client for admin reads/writes
    middleware.ts session refresh + optimistic /admin gate, used by proxy.ts
    admin-auth.ts requireAdmin() — the real per-request auth check
    admin-emails.ts ADMIN_EMAILS allowlist parsing
    queries.ts     public + admin read functions (services + testimonials)
  email/        resend.ts (Day 4)
  utils/        cn.ts, serviceIcons.tsx (shared lucide icon map)
types/          shared TypeScript types
supabase/
  migrations/   SQL schema + seed data
proxy.ts        Next 16 Proxy (formerly Middleware) — runs on every request
```
