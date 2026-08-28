import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
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
    <Section>
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={dict.servicesPage.eyebrow}
          title={dict.servicesPage.title}
          description={dict.servicesPage.description}
        />
        <div className="mt-16">
          <ServiceGrid
            services={services}
            emptyMessage={dict.serviceGrid.empty}
            learnMoreLabel={dict.serviceCard.learnMore}
          />
        </div>
      </Container>
    </Section>
  );
}
