import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { caseStudies } from "@/lib/data/caseStudies";

export function CaseStudies() {
  return (
    <section className="bg-surface-muted py-20 dark:bg-surface-dark-muted/40 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Case studies" title="Recent engagements." />
          <Link
            href="/case-studies"
            className="flex items-center gap-1 text-sm font-medium text-brand dark:text-signal"
          >
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Card key={cs.slug}>
              <p className="font-mono text-xs uppercase tracking-wide text-brand dark:text-signal">
                {cs.industry}
              </p>
              <h3 className="mt-3 font-display text-lg font-medium text-ink dark:text-white">
                {cs.client}
              </h3>
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
    </section>
  );
}
