import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LegalBody, linkClass } from "@/components/legal/LegalBody";
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
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
    alternates: localeAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = (await getDictionary(locale)).privacyPage;

  return (
    <div className="py-20 sm:py-28">
      <Container className="max-w-2xl">
        <h1 className="font-display text-3xl font-medium text-ink dark:text-white">
          {dict.title}
        </h1>
        <p className="mt-4 text-sm text-ink-soft dark:text-white/50">
          {dict.lastUpdated}
        </p>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-soft dark:text-white/70">
          {dict.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-display text-lg font-medium text-ink dark:text-white">
                {section.heading}
              </h2>

              {"bullets" in section && section.bullets ? (
                <>
                  <p className="mt-2">{section.intro}</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    {section.bullets.map((b, j) => (
                      <li key={j}>
                        <strong className="text-ink dark:text-white">{b.label}</strong> {b.body}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2">{section.outro}</p>
                </>
              ) : "providers" in section && section.providers ? (
                <>
                  <p className="mt-2">{section.intro}</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    {section.providers.map((p, j) => (
                      <li key={j}>
                        <strong className="text-ink dark:text-white">{p.name}</strong> — {p.body} (
                        <a href={p.href} target="_blank" rel="noreferrer" className={linkClass}>
                          {p.linkLabel}
                        </a>
                        ).
                      </li>
                    ))}
                  </ul>
                </>
              ) : "body" in section && section.body ? (
                <LegalBody text={section.body} />
              ) : null}
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
