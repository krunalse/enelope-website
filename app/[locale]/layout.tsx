import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "./dictionaries";
import { HtmlLangSync } from "@/components/layout/HtmlLangSync";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <>
      <HtmlLangSync locale={locale} />
      <Navbar locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
