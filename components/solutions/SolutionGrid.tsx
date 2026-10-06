import { SolutionCard } from "./SolutionCard";
import type { Solution } from "@/types";

interface SolutionGridProps {
  solutions: Solution[];
  basePath: "/industries" | "/use-cases";
  learnMoreLabel: string;
  /** Two large image-led cards per row with tight gaps. */
  large?: boolean;
}

export function SolutionGrid({
  solutions,
  basePath,
  learnMoreLabel,
  large = false,
}: SolutionGridProps) {
  return (
    <div
      className={
        large
          ? "grid gap-2 sm:grid-cols-2"
          : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      }
    >
      {solutions.map((solution) => (
        <SolutionCard
          key={solution.slug}
          solution={solution}
          basePath={basePath}
          learnMoreLabel={learnMoreLabel}
          large={large}
        />
      ))}
    </div>
  );
}
