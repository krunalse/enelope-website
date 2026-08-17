import { Hero } from "@/components/sections/Hero";
import { ValueProp } from "@/components/sections/ValueProp";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Capabilities } from "@/components/sections/Capabilities";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProp />
      <ServicesPreview />
      <Capabilities />
      <WhyChooseUs />
      <Process />
      <CaseStudies />
      <Testimonials />
      <CTA />
    </>
  );
}
