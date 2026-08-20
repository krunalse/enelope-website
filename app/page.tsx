import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ValueProp } from "@/components/sections/ValueProp";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Capabilities } from "@/components/sections/Capabilities";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { dictionary as dict } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: dict.meta.home.title,
  description: dict.meta.home.description,
};

export default function HomePage() {
  return (
    <>
      <Hero dict={dict.home.hero} />
      <ValueProp dict={dict.home.valueProp} />
      <ServicesPreview
        dict={dict.home.servicesPreview}
        serviceGridDict={dict.serviceGrid}
        learnMoreLabel={dict.serviceCard.learnMore}
      />
      <Capabilities dict={dict.home.capabilities} />
      <WhyChooseUs dict={dict.home.whyChooseUs} />
      <Process dict={dict.home.process} />
      <CaseStudies dict={dict.home.caseStudiesSection} />
      <Testimonials dict={dict.home.testimonialsSection} />
      <CTA dict={dict.home.cta} />
    </>
  );
}
