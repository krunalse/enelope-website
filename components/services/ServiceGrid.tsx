import { Service } from "@/types";
import { ServiceCard } from "./ServiceCard";
import type { Locale } from "@/lib/i18n/locales";

interface ServiceGridProps {
  services: Service[];
  locale: Locale;
  emptyMessage: string;
  learnMoreLabel: string;
}

export function ServiceGrid({ services, locale, emptyMessage, learnMoreLabel }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <p className="text-sm text-ink-soft dark:text-white/60">{emptyMessage}</p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          locale={locale}
          learnMoreLabel={learnMoreLabel}
        />
      ))}
    </div>
  );
}
