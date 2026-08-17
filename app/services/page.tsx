import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { getActiveServices } from "@/lib/supabase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI agents, chatbots, cloud infrastructure, and consulting — Enelope's four core services.",
};

export default async function ServicesPage() {
  const services = await getActiveServices();

  return (
    <div className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Four ways we help you automate with confidence."
          description="Every engagement starts with consulting — we don't build until we're confident it's worth building."
        />
        <div className="mt-14">
          <ServiceGrid services={services} />
        </div>
      </Container>
    </div>
  );
}
