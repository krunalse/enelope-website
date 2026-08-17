import type { MetadataRoute } from "next";
import { getActiveServices } from "@/lib/supabase/queries";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { localeAlternates } from "@/lib/i18n/alternates";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.enelope.ch";

const STATIC_PATHS: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getActiveServices(DEFAULT_LOCALE);

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(({ path, changeFrequency, priority }) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}/${locale}${path === "/" ? "" : path}`,
      changeFrequency,
      priority,
      alternates: localeAlternates(locale, path),
    }))
  );

  const serviceRoutes: MetadataRoute.Sitemap = services.flatMap((service) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}/${locale}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: localeAlternates(locale, `/services/${service.slug}`),
    }))
  );

  return [...staticRoutes, ...serviceRoutes];
}
