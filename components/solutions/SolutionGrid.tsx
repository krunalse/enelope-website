import { SolutionCard } from "./SolutionCard";
import type { Solution } from "@/types";

interface SolutionGridProps {
  solutions: Solution[];
  basePath: "/industries" | "/use-cases";
  learnMoreLabel: string;
}

export function SolutionGrid({
  solutions,
  basePath,
  learnMoreLabel,
}: SolutionGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {solutions.map((solution) => (
        <SolutionCard
          key={solution.slug}
          solution={solution}
          basePath={basePath}
          learnMoreLabel={learnMoreLabel}
        />
      ))}
    </div>
  );
}
