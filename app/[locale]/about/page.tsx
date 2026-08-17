import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "../dictionaries";
import { localeAlternates } from "@/lib/i18n/alternates";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: localeAlternates(locale, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = (await getDictionary(locale)).about;

  return (
    <div className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {dict.values.map((v, i) => (
            <Card key={i}>
              <h3 className="font-display text-lg font-medium text-ink dark:text-white">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/60">
                {v.body}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
