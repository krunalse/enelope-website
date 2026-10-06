import Image from "@/components/ui/Image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { Service } from "@/types";
import { getServiceIcon } from "@/lib/utils/serviceIcons";

interface ServiceCardProps {
  service: Service;
  learnMoreLabel: string;
  large?: boolean;
}

export function ServiceCard({ service, learnMoreLabel, large = false }: ServiceCardProps) {
  const Icon = getServiceIcon(service.icon);

  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
      <Card
        interactive
        className={cn(
          "relative flex h-full w-full flex-col justify-end overflow-hidden rounded-none bg-ink",
          large ? "aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/9]" : "aspect-[2/3]",
        )}
      >
        {service.imageUrl && (
          <Image
            src={service.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] group-hover:brightness-110"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent transition-opacity duration-500 group-hover:opacity-90"
        />

        <div className={cn("relative p-6", large && "sm:p-8 lg:p-10")}>
          <div
            className={cn(
              "mb-4 flex h-11 w-11 items-center justify-center bg-white/15 text-white backdrop-blur-sm",
              large && "lg:mb-5 lg:h-12 lg:w-12",
            )}
          >
            <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
          </div>
          <h3
            className={cn(
              "font-display text-[1.4375rem] font-semibold leading-snug text-white",
              large && "text-[1.75rem] leading-tight lg:text-4xl",
            )}
          >
            {service.title}
          </h3>
          <p
            className={cn(
              "mt-2.5 text-[1rem] leading-7 text-white/85",
              large && "mt-3 max-w-xl lg:text-[1.0625rem] lg:leading-8",
            )}
          >
            {service.shortDescription}
          </p>
          <div
            className={cn(
              "mt-5 flex items-center gap-1.5 text-sm font-medium text-white",
              large && "lg:mt-6 lg:text-base",
            )}
          >
            {learnMoreLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
