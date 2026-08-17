import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, isLocale, type Locale } from "./locales";

export const LOCALE_COOKIE = "NEXT_LOCALE";

// Minimal, dependency-free negotiation for a fixed set of 4 locales — no
// need for full RFC 4647 matching (negotiator / intl-localematcher) here.
export function getLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((part) => part.split(";")[0]?.trim().split("-")[0]?.toLowerCase());

    for (const lang of preferred) {
      if (lang && isLocale(lang)) return lang;
    }
  }

  return DEFAULT_LOCALE;
}

export function pathnameHasLocale(pathname: string): boolean {
  return LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export function stripLocale(pathname: string): { locale: Locale | null; rest: string } {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return { locale, rest: "/" };
    if (pathname.startsWith(`/${locale}/`)) {
      return { locale, rest: pathname.slice(locale.length + 1) };
    }
  }
  return { locale: null, rest: pathname };
}
