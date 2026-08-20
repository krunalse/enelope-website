import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { getServices } from "@/lib/content/data";
import { dictionary } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: dictionary.meta.services.title,
  description: dictionary.meta.services.description,
};

export default function ServicesPage() {
  const dict = dictionary;
  const services = getServices();

  return (
    <div className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={dict.servicesPage.eyebrow}
          title={dict.servicesPage.title}
          description={dict.servicesPage.description}
        />
        <div className="mt-14">
          <ServiceGrid
            services={services}
            emptyMessage={dict.serviceGrid.empty}
            learnMoreLabel={dict.serviceCard.learnMore}
          />
        </div>
      </Container>
    </div>
  );
}
