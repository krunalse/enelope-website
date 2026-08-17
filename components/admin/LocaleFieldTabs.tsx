"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/locales";

interface LocaleFieldTabsProps {
  // Pre-rendered JSX per locale, built by the (Server Component) caller.
  // Deliberately NOT a render-prop function — functions can't cross the
  // Server -> Client Component boundary, only already-resolved elements can.
  panels: Record<Locale, ReactNode>;
}

// Small tab switcher used inside ServiceForm/TestimonialForm so the 4
// language versions of the translatable fields don't all render at once
// (would make the form very long). English is marked required since it's
// the fallback language shown whenever another locale hasn't been filled
// in yet.
export function LocaleFieldTabs({ panels }: LocaleFieldTabsProps) {
  const [active, setActive] = useState<Locale>("en");

  return (
    <div>
      <div className="flex gap-1 border-b border-ink/10 dark:border-white/10">
        {LOCALES.map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => setActive(locale)}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors",
              active === locale
                ? "border-b-2 border-brand text-brand dark:border-signal dark:text-signal"
                : "text-ink-soft hover:text-ink dark:text-white/50 dark:hover:text-white"
            )}
          >
            {LOCALE_LABELS[locale]}
            {locale === "en" && " *"}
          </button>
        ))}
      </div>
      {LOCALES.map((locale) => (
        <div key={locale} className={cn("mt-5", active !== locale && "hidden")}>
          {panels[locale]}
        </div>
      ))}
    </div>
  );
}
