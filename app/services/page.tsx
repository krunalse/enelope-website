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
    <Section className="!pt-6 sm:!pt-8">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={dict.servicesPage.eyebrow}
          title={dict.servicesPage.title}
          description={dict.servicesPage.description}
        />
      </Container>
      <div className="mx-auto mt-6 w-full max-w-[1800px] px-2 sm:px-3">
        <ServiceGrid
          services={services}
          emptyMessage={dict.serviceGrid.empty}
          learnMoreLabel={dict.serviceCard.learnMore}
          large
        />
      </div>
    </Section>
  );
}
