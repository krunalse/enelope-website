import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
    <section className="bg-surface-muted py-20 dark:bg-surface-dark-muted/40 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
          <Link
            href="/case-studies"
            className="flex items-center gap-1 text-sm font-medium text-brand dark:text-signal"
          >
            {dict.viewAll} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </Container>
    </section>
  );
}
