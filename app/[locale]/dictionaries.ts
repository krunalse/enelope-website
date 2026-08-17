import type { Locale } from "@/lib/i18n/locales";
import en from "./dictionaries/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => Promise.resolve(en),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  it: () => import("./dictionaries/it.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
