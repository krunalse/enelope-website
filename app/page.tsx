import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ValueProp } from "@/components/sections/ValueProp";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Capabilities } from "@/components/sections/Capabilities";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { Solutions } from "@/components/sections/Solutions";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { getIndustries, getUseCases } from "@/lib/content/solutions";
import { dictionary as dict } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: dict.meta.home.title,
  description: dict.meta.home.description,
};

export default function HomePage() {
  return (
    <>
      <Hero dict={dict.home.hero} />
      <ServicesPreview
        dict={dict.home.servicesPreview}
        serviceGridDict={dict.serviceGrid}
        learnMoreLabel={dict.serviceCard.learnMore}
      />
      <Solutions
        tone="muted"
        dict={dict.home.industriesSection}
        solutions={getIndustries()}
        basePath="/industries"
        learnMoreLabel={dict.serviceCard.learnMore}
      />
      <Solutions
        dict={dict.home.useCasesSection}
        solutions={getUseCases()}
        basePath="/use-cases"
        learnMoreLabel={dict.serviceCard.learnMore}
      />
      <ValueProp tone="muted" dict={dict.home.valueProp} />
      <Process dict={dict.home.process} />
      <Capabilities tone="muted" dict={dict.home.capabilities} />
      <WhyChooseUs tone="default" dict={dict.home.whyChooseUs} />
      <Testimonials tone="muted" dict={dict.home.testimonialsSection} />
      <CTA dict={dict.home.cta} />
    </>
  );
}
