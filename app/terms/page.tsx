import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LegalBody } from "@/components/legal/LegalBody";
import { dictionary } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: dictionary.meta.terms.title,
  description: dictionary.meta.terms.description,
};

export default function TermsPage() {
  const dict = dictionary.termsPage;

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
              <LegalBody text={section.body} />
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
