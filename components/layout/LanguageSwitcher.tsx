"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/locales";
import { LOCALE_COOKIE } from "@/lib/i18n/getLocale";
import { stripLocale } from "@/lib/i18n/getLocale";

const selectClass =
  "rounded-full border border-ink/10 bg-transparent px-3 py-2 text-sm text-ink dark:border-white/15 dark:text-white dark:[color-scheme:dark] focus:outline-none";

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Locale;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    const { rest } = stripLocale(pathname ?? "/");
    router.push(`/${next}${rest === "/" ? "" : rest}`);
  }

  return (
    <select
      aria-label={label}
      data-testid="language-switcher"
      value={locale}
      onChange={handleChange}
      className={selectClass}
    >
      {LOCALES.map((code) => (
        <option key={code} value={code}>
          {LOCALE_LABELS[code]}
        </option>
      ))}
    </select>
  );
}
