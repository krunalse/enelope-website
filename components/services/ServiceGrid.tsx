import { Service } from "@/types";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
  services: Service[];
  emptyMessage: string;
  learnMoreLabel: string;
  /** Two large image-led cards per row with tight gaps. */
  large?: boolean;
}

export function ServiceGrid({
  services,
  emptyMessage,
  learnMoreLabel,
  large = false,
}: ServiceGridProps) {
  if (services.length === 0) {
    return <p className="text-sm text-ink-soft">{emptyMessage}</p>;
  }

  return (
    <div
      className={
        large
          ? "grid gap-2 sm:grid-cols-2"
          : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      }
    >
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          learnMoreLabel={learnMoreLabel}
          large={large}
        />
      ))}
    </div>
  );
}
