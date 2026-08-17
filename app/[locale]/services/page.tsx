import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { getActiveServices } from "@/lib/supabase/queries";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "../dictionaries";
import { localeAlternates } from "@/lib/i18n/alternates";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.services.title,
    description: dict.meta.services.description,
    alternates: localeAlternates(locale, "/services"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const services = await getActiveServices(locale);

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
            locale={locale}
            emptyMessage={dict.serviceGrid.empty}
            learnMoreLabel={dict.serviceCard.learnMore}
          />
        </div>
      </Container>
    </div>
  );
}
