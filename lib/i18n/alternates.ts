import { LOCALES, type Locale } from "./locales";

// Builds the `alternates.languages` metadata field for a page, pointing at
// its sibling in every other locale. `path` is the locale-free path
// (e.g. "/", "/about", "/services/ai-agents") for generateMetadata's
// `alternates` option.
export function localeAlternates(currentLocale: Locale, path: string) {
  const normalizedPath = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = `/${locale}${normalizedPath}`;
  }
  return { languages };
}
