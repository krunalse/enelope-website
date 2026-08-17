import { Service } from "@/types";
import { ServiceCard } from "./ServiceCard";

export function ServiceGrid({ services }: { services: Service[] }) {
  if (services.length === 0) {
    return (
      <p className="text-sm text-ink-soft dark:text-white/60">
        Services will appear here once they&apos;re published.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
