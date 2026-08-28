import type { Metadata } from "next";
import { LegalBody } from "@/components/legal/LegalBody";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { dictionary } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: dictionary.meta.terms.title,
  description: dictionary.meta.terms.description,
};

export default function TermsPage() {
  const dict = dictionary.termsPage;

  return (
    <LegalPage title={dict.title} lastUpdated={dict.lastUpdated}>
      {dict.sections.map((section, i) => (
        <LegalSection key={i} index={i + 1} heading={section.heading}>
          <LegalBody text={section.body} />
        </LegalSection>
      ))}
    </LegalPage>
  );
}
