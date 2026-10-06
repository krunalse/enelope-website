import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SolutionGrid } from "@/components/solutions/SolutionGrid";
import type { Solution } from "@/types";

interface SolutionsProps {
  dict: { eyebrow: string; title: string; viewAll: string };
  solutions: Solution[];
  basePath: "/industries" | "/use-cases";
  learnMoreLabel: string;
  tone?: "default" | "muted";
}

/** Home-page teaser for industries / use cases: first four entries plus a link to all. */
export function Solutions({
  dict,
  solutions,
  basePath,
  learnMoreLabel,
  tone = "default",
}: SolutionsProps) {
  return (
    <Section tone={tone}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
          <Link
            href={basePath}
            className="group flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-dark"
          >
            {dict.viewAll}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Container>
      <div className="mx-auto mt-12 w-full max-w-[1800px] px-2 sm:px-3">
        <SolutionGrid
          solutions={solutions.slice(0, 4)}
          basePath={basePath}
          learnMoreLabel={learnMoreLabel}
          large
        />
      </div>
    </Section>
  );
}
