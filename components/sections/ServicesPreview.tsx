import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { getServices } from "@/lib/content/data";
import type { Dictionary } from "@/lib/content/dictionary";

interface ServicesPreviewProps {
  dict: Dictionary["home"]["servicesPreview"];
  serviceGridDict: Dictionary["serviceGrid"];
  learnMoreLabel: string;
}

export function ServicesPreview({
  dict,
  serviceGridDict,
  learnMoreLabel,
}: ServicesPreviewProps) {
  const services = getServices();

  return (
    <Section className="!pt-6 sm:!pt-8">
      <Container>
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
      </Container>
      <div className="mx-auto mt-6 w-full max-w-[1800px] px-2 sm:px-3">
        <ServiceGrid
          services={services}
          emptyMessage={serviceGridDict.empty}
          learnMoreLabel={learnMoreLabel}
          large
        />
      </div>
    </Section>
  );
}
