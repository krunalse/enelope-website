import Image from "@/components/ui/Image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import type { Solution } from "@/types";

interface SolutionCardProps {
  solution: Solution;
  basePath: "/industries" | "/use-cases";
  learnMoreLabel: string;
  large?: boolean;
}

export function SolutionCard({
  solution,
  basePath,
  learnMoreLabel,
  large = false,
}: SolutionCardProps) {
  return (
    <Link href={`${basePath}/${solution.slug}`} className="group block h-full">
      <Card
        className={cn(
          "relative flex h-full w-full flex-col justify-end overflow-hidden rounded-none border-0 bg-ink",
          large
            ? "aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/9]"
            : "aspect-[2/3]",
        )}
      >
        <Image
          src={solution.imageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 via-45% to-transparent"
        />

        <div className={cn("relative p-6", large && "sm:p-8 lg:p-10")}>
          <h3
            className={cn(
              "font-display text-[1.4375rem] font-semibold leading-snug text-white",
              large && "text-[2.0625rem] leading-tight sm:text-[2.5625rem]",
            )}
          >
            {solution.title}
          </h3>
          <p
            className={cn(
              "mt-2.5 text-[1rem] leading-7 text-white/85",
              large && "mt-3 max-w-xl sm:text-[1.25rem] sm:leading-8",
            )}
          >
            {solution.description}
          </p>
          <div
            className={cn(
              "mt-5 flex items-center gap-1.5 text-sm font-medium text-white",
              large && "lg:mt-6 lg:text-base",
            )}
          >
            {learnMoreLabel}
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
