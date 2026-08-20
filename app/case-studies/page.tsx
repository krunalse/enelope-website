import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { getCaseStudies } from "@/lib/content/data";
import { dictionary } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: dictionary.meta.caseStudies.title,
  description: dictionary.meta.caseStudies.description,
};

export default function CaseStudiesPage() {
  const dict = dictionary.caseStudiesPage;
  const caseStudies = getCaseStudies();

  return (
    <div className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </Container>
    </div>
  );
}
