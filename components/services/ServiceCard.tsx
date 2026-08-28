import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Service } from "@/types";
import { getServiceIcon } from "@/lib/utils/serviceIcons";

interface ServiceCardProps {
  service: Service;
  learnMoreLabel: string;
}

export function ServiceCard({ service, learnMoreLabel }: ServiceCardProps) {
  const Icon = getServiceIcon(service.icon);

  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
      <Card interactive className="flex h-full flex-col overflow-hidden">
        {service.imageUrl && (
          // The icon sits outside the clipping wrapper so it can overhang the image edge.
          <div className="relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
              <Image
                src={service.imageUrl}
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
            <div className="absolute -bottom-5 left-6 flex h-11 w-11 items-center justify-center rounded-xl border border-ink/[0.07] bg-surface text-brand shadow-soft">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col justify-between p-6 pt-9">
          <div>
            <h3 className="font-display text-[1.375rem] font-normal leading-snug text-ink">
              {service.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
              {service.shortDescription}
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
