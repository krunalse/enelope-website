import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { getActiveServices } from "@/lib/supabase/queries";

export async function ServicesPreview() {
  const services = await getActiveServices();

  return (
    <section className="bg-surface-muted py-20 dark:bg-surface-dark-muted/40 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Four ways we help you automate with confidence."
        />
        <div className="mt-14">
          <ServiceGrid services={services} />
        </div>
      </Container>
    </section>
  );
}
