# Enelope Website

AI Agents · Chatbots · Cloud · Consulting — marketing site.

Next.js (App Router) · TypeScript · Tailwind CSS · Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The site is fully static content — English only,
light theme only, no database, no admin panel, and no server-side services.
The contact form opens a pre-filled `mailto:` link in the visitor's own email
app rather than sending anything through the server.

## Editing content

There's no CMS or admin panel — content lives directly in the repo:

- **Services, case studies, testimonials**: `lib/content/data.ts` — plain
  arrays typed by `types/index.ts`. Edit the arrays directly and redeploy.
- **All other site copy** (nav, footer, homepage sections, About, page
  chrome, legal pages, form labels): `lib/content/dictionary.json`, typed via
  `lib/content/dictionary.ts` (`Dictionary = typeof dictionary`).

## Still to build

- Deployment: GitHub → Vercel → Production, Vercel env vars, custom domain.

## Project structure

```
app/
  layout.tsx          root layout — html/body, fonts, Navbar, Footer
  page.tsx, about/, services/, services/[slug]/, case-studies/,
  case-studies/[slug]/, contact/, privacy/, terms/
components/
  layout/       Navbar, Footer
  ui/           Button, Card, Badge, Container, SectionHeading
  sections/     homepage sections (Hero, Process, Testimonials, ...)
  services/     ServiceCard, ServiceGrid
  case-studies/ CaseStudyCard
  testimonials/ TestimonialCard
  legal/        LegalBody — renders Privacy/Terms body text with the
                {email} placeholder swapped for a real mailto link
  forms/        ContactForm
lib/
  content/      data.ts (services/case studies/testimonials),
                dictionary.json + dictionary.ts (all other site copy)
  utils/        cn.ts, serviceIcons.tsx (shared lucide icon map)
types/          shared TypeScript types
```
