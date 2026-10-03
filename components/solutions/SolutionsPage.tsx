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
    <Section>
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />
        <div className="mt-16">
          <SolutionGrid
            solutions={solutions}
            basePath={basePath}
            learnMoreLabel={dictionary.serviceCard.learnMore}
          />
        </div>
      </Container>
    </Section>
  );
}
