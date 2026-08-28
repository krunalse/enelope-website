import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CaseStudy } from "@/types";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className="group block h-full"
    >
      <Card interactive className="flex h-full flex-col overflow-hidden">
        {caseStudy.imageUrl && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
            <Image
              src={caseStudy.imageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent"
            />
            <p className="absolute bottom-4 left-5 font-mono text-[0.6875rem] uppercase tracking-eyebrow text-white/90">
              {caseStudy.industry}
            </p>
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-[1.375rem] font-normal leading-snug text-ink">
            {caseStudy.clientName}
          </h3>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
            {caseStudy.summary}
          </p>

          <div className="mt-5 border-t border-ink/[0.07] pt-4">
            <p className="flex items-start gap-2 text-sm font-medium text-brand">
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              {caseStudy.result}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
