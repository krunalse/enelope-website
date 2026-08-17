import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { caseStudies } from "@/lib/data/caseStudies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Recent Enelope engagements across logistics, analytics, and e-commerce.",
};

export default function CaseStudiesPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Case studies"
          title="Recent engagements."
          description="A sample of the work — full write-ups available on request."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Card key={cs.slug}>
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
