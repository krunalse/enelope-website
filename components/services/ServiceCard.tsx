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
      <Card className="flex h-full flex-col justify-between">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand dark:bg-signal/15 dark:text-signal">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mt-5 font-display text-xl font-medium text-ink dark:text-white">
            {service.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/60">
            {service.shortDescription}
          </p>
        </div>
        <div className="mt-6 flex items-center gap-1 text-sm font-medium text-brand transition-transform group-hover:translate-x-1 dark:text-signal">
          {learnMoreLabel} <ArrowUpRight className="h-4 w-4" />
        </div>
      </Card>
    </Link>
  );
}
