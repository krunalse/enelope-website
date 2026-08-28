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
    <Section tone="muted">
      <Container>
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
        <div className="mt-16">
          <ServiceGrid
            services={services}
            emptyMessage={serviceGridDict.empty}
            learnMoreLabel={learnMoreLabel}
          />
        </div>
      </Container>
    </Section>
  );
}
