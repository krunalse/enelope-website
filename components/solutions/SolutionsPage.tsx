import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SolutionGrid } from "./SolutionGrid";
import { dictionary } from "@/lib/content/dictionary";
import type { Solution } from "@/types";

interface SolutionsPageProps {
  solutions: Solution[];
  basePath: "/industries" | "/use-cases";
  dict: { eyebrow: string; title: string; description: string };
}

export function SolutionsPage({ solutions, basePath, dict }: SolutionsPageProps) {
  return (
    <Section className="!pt-6 sm:!pt-8">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />
      </Container>
      <div className="mx-auto mt-6 w-full max-w-[1800px] px-2 sm:px-3">
        <SolutionGrid
          solutions={solutions}
          basePath={basePath}
          learnMoreLabel={dictionary.serviceCard.learnMore}
          large
        />
      </div>
    </Section>
  );
}
