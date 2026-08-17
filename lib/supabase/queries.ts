import { createClient as createPublicClient } from "@/lib/supabase/public";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { Service, Testimonial } from "@/types";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

// Public read functions accept a Locale and return the requested language's
// content, falling back to English when a translation hasn't been filled
// in yet. Services (Day 2), testimonials (Day 3), and per-language content
// (i18n) are all fully live.

export interface ServiceTranslationRow {
  locale: Locale;
  title: string | null;
  short_description: string | null;
  full_description: string | null;
}

export interface ServiceRow {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
  image_url: string | null;
  image_path: string | null;
  display_order: number;
  is_active: boolean;
  service_translations?: ServiceTranslationRow[];
}

export interface TestimonialTranslationRow {
  locale: Locale;
  testimonial: string | null;
  customer_role: string | null;
}

export interface TestimonialRow {
  id: string;
  customer_name: string;
  customer_role: string;
  company_name: string;
  testimonial: string;
  avatar_url: string | null;
  avatar_path: string | null;
  rating: number;
  display_order: number;
  is_active: boolean;
  testimonial_translations?: TestimonialTranslationRow[];
}

function pickServiceTranslation(row: ServiceRow, locale: Locale) {
  const translations = row.service_translations ?? [];
  const forLocale = translations.find((t) => t.locale === locale);
  const forEnglish = translations.find((t) => t.locale === DEFAULT_LOCALE);

  return {
    title: forLocale?.title || forEnglish?.title || row.title,
    shortDescription:
      forLocale?.short_description || forEnglish?.short_description || row.short_description,
    fullDescription:
      forLocale?.full_description || forEnglish?.full_description || row.full_description,
  };
}

function pickTestimonialTranslation(row: TestimonialRow, locale: Locale) {
  const translations = row.testimonial_translations ?? [];
  const forLocale = translations.find((t) => t.locale === locale);
  const forEnglish = translations.find((t) => t.locale === DEFAULT_LOCALE);

  return {
    testimonial: forLocale?.testimonial || forEnglish?.testimonial || row.testimonial,
    customerRole: forLocale?.customer_role || forEnglish?.customer_role || row.customer_role,
  };
}

function mapService(row: ServiceRow, locale: Locale): Service {
  const t = pickServiceTranslation(row, locale);
  return {
    id: row.id,
    title: t.title,
    slug: row.slug,
    shortDescription: t.shortDescription,
    fullDescription: t.fullDescription,
    icon: row.icon,
    imageUrl: row.image_url,
    displayOrder: row.display_order,
    isActive: row.is_active,
  };
}

function mapTestimonial(row: TestimonialRow, locale: Locale): Testimonial {
  const t = pickTestimonialTranslation(row, locale);
  return {
    id: row.id,
    customerName: row.customer_name,
    customerRole: t.customerRole,
    companyName: row.company_name,
    testimonial: t.testimonial,
    avatarUrl: row.avatar_url,
    rating: row.rating,
    displayOrder: row.display_order,
    isActive: row.is_active,
  };
}

export async function getActiveServices(locale: Locale): Promise<Service[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, service_translations(*)")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getActiveServices failed:", error);
    return [];
  }
  return (data as ServiceRow[]).map((row) => mapService(row, locale));
}

export async function getServiceBySlug(slug: string, locale: Locale): Promise<Service | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, service_translations(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return mapService(data as ServiceRow, locale);
}

export async function getActiveTestimonials(locale: Locale): Promise<Testimonial[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*, testimonial_translations(*)")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getActiveTestimonials failed:", error);
    return [];
  }
  return (data as TestimonialRow[]).map((row) => mapTestimonial(row, locale));
}

// Admin read functions use the cookie-aware SSR client and return raw rows
// (snake_case, includes inactive rows, image_path, and every language's
// translation keyed by locale) since the admin UI works directly against
// the database shape. Only call these from within app/admin/(protected) —
// that layout already enforces the auth check.

export type ServiceTranslations = Record<
  Locale,
  { title: string; short_description: string; full_description: string }
>;

export type TestimonialTranslations = Record<
  Locale,
  { testimonial: string; customer_role: string }
>;

function buildServiceTranslations(row: ServiceRow): ServiceTranslations {
  const translations = row.service_translations ?? [];
  const result = {} as ServiceTranslations;
  for (const locale of LOCALES) {
    const found = translations.find((t) => t.locale === locale);
    result[locale] = {
      title: found?.title ?? (locale === DEFAULT_LOCALE ? row.title : ""),
      short_description:
        found?.short_description ?? (locale === DEFAULT_LOCALE ? row.short_description : ""),
      full_description:
        found?.full_description ?? (locale === DEFAULT_LOCALE ? row.full_description : ""),
    };
  }
  return result;
}

function buildTestimonialTranslations(row: TestimonialRow): TestimonialTranslations {
  const translations = row.testimonial_translations ?? [];
  const result = {} as TestimonialTranslations;
  for (const locale of LOCALES) {
    const found = translations.find((t) => t.locale === locale);
    result[locale] = {
      testimonial: found?.testimonial ?? (locale === DEFAULT_LOCALE ? row.testimonial : ""),
      customer_role: found?.customer_role ?? (locale === DEFAULT_LOCALE ? row.customer_role : ""),
    };
  }
  return result;
}

export async function getAllServicesForAdmin(): Promise<
  (ServiceRow & { translations: ServiceTranslations })[]
> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, service_translations(*)")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getAllServicesForAdmin failed:", error);
    return [];
  }
  return (data as ServiceRow[]).map((row) => ({ ...row, translations: buildServiceTranslations(row) }));
}

export async function getServiceByIdForAdmin(
  id: string
): Promise<(ServiceRow & { translations: ServiceTranslations }) | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, service_translations(*)")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  const row = data as ServiceRow;
  return { ...row, translations: buildServiceTranslations(row) };
}

export async function getAllTestimonialsForAdmin(): Promise<
  (TestimonialRow & { translations: TestimonialTranslations })[]
> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*, testimonial_translations(*)")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getAllTestimonialsForAdmin failed:", error);
    return [];
  }
  return (data as TestimonialRow[]).map((row) => ({
    ...row,
    translations: buildTestimonialTranslations(row),
  }));
}

export async function getTestimonialByIdForAdmin(
  id: string
): Promise<(TestimonialRow & { translations: TestimonialTranslations }) | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*, testimonial_translations(*)")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  const row = data as TestimonialRow;
  return { ...row, translations: buildTestimonialTranslations(row) };
}
