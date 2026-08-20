import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { CaseStudy } from "@/types";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${caseStudy.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col">
        {caseStudy.imageUrl && (
          <div className="mb-5 h-32 w-full overflow-hidden rounded-xl">
            <Image
              src={caseStudy.imageUrl}
              alt=""
              width={400}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <p className="font-mono text-xs uppercase tracking-wide text-brand dark:text-signal">
          {caseStudy.industry}
        </p>
        <h3 className="mt-3 font-display text-lg font-medium text-ink dark:text-white">
          {caseStudy.clientName}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft dark:text-white/60">
          {caseStudy.summary}
        </p>
        <p className="mt-4 text-sm font-medium text-brand dark:text-signal">
          {caseStudy.result}
        </p>
      </Card>
    </Link>
  );
}
