import Image from "@/components/ui/Image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Solution } from "@/types";

interface SolutionCardProps {
  solution: Solution;
  basePath: "/industries" | "/use-cases";
  learnMoreLabel: string;
}

export function SolutionCard({
  solution,
  basePath,
  learnMoreLabel,
}: SolutionCardProps) {
  return (
    <Link href={`${basePath}/${solution.slug}`} className="group block h-full">
      <Card interactive className="flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
          <Image
            src={solution.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <h3 className="font-display text-[1.4375rem] font-semibold leading-snug text-ink">
              {solution.title}
            </h3>
            <p className="mt-2.5 text-[1rem] leading-7 text-ink-soft">
              {solution.description}
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-brand">
            {learnMoreLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
