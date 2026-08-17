"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/locales";

// The true root layout (app/layout.tsx) sits above app/[locale] and also
// serves the unlocalized /admin routes, so it can't read the locale to set
// <html lang> server-side. This syncs it client-side instead.
export function HtmlLangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
