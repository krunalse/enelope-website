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
    title: dict.meta.caseStudies.title,
    description: dict.meta.caseStudies.description,
    alternates: localeAlternates(locale, "/case-studies"),
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = (await getDictionary(locale)).caseStudiesPage;

  return (
    <div className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {dict.items.map((cs, i) => (
            <Card key={i}>
              <p className="font-mono text-xs uppercase tracking-wide text-brand dark:text-signal">
                {cs.industry}
              </p>
              <h2 className="mt-3 font-display text-lg font-medium text-ink dark:text-white">
                {cs.client}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft dark:text-white/60">
                {cs.summary}
              </p>
              <p className="mt-4 text-sm font-medium text-brand dark:text-signal">
                {cs.result}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
