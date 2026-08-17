import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { getActiveServices } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[locale]/dictionaries";

interface ServicesPreviewProps {
  locale: Locale;
  dict: Dictionary["home"]["servicesPreview"];
  serviceGridDict: Dictionary["serviceGrid"];
  learnMoreLabel: string;
}

export async function ServicesPreview({
  locale,
  dict,
  serviceGridDict,
  learnMoreLabel,
}: ServicesPreviewProps) {
  const services = await getActiveServices(locale);

  return (
    <section className="bg-surface-muted py-20 dark:bg-surface-dark-muted/40 sm:py-28">
      <Container>
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
        <div className="mt-14">
          <ServiceGrid
            services={services}
            locale={locale}
            emptyMessage={serviceGridDict.empty}
            learnMoreLabel={learnMoreLabel}
          />
        </div>
      </Container>
    </section>
  );
}
