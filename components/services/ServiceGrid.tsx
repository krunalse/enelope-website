import { Service } from "@/types";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
  services: Service[];
  emptyMessage: string;
  learnMoreLabel: string;
}

export function ServiceGrid({ services, emptyMessage, learnMoreLabel }: ServiceGridProps) {
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
          learnMoreLabel={learnMoreLabel}
        />
      ))}
    </div>
  );
}
