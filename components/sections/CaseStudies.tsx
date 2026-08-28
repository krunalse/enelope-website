import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { getCaseStudies } from "@/lib/content/data";
import type { Dictionary } from "@/lib/content/dictionary";

interface CaseStudiesProps {
  dict: Dictionary["home"]["caseStudiesSection"];
}

export function CaseStudies({ dict }: CaseStudiesProps) {
  const caseStudies = getCaseStudies();

  return (
    <Section tone="muted">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
          <Link
            href="/case-studies"
            className="group flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-dark"
          >
            {dict.viewAll}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
