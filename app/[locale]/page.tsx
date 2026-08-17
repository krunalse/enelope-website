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
import { LOCALES, isLocale, type Locale } from "@/lib/i18n/locales";
import { getDictionary } from "./dictionaries";
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
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: localeAlternates(locale, "/"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict.home.hero} />
      <ValueProp dict={dict.home.valueProp} />
      <ServicesPreview
        locale={locale}
        dict={dict.home.servicesPreview}
        serviceGridDict={dict.serviceGrid}
        learnMoreLabel={dict.serviceCard.learnMore}
      />
      <Capabilities dict={dict.home.capabilities} />
      <WhyChooseUs dict={dict.home.whyChooseUs} />
      <Process dict={dict.home.process} />
      <CaseStudies
        locale={locale}
        dict={dict.home.caseStudiesSection}
        items={dict.caseStudiesPage.items}
      />
      <Testimonials locale={locale} dict={dict.home.testimonialsSection} />
      <CTA locale={locale} dict={dict.home.cta} />
    </>
  );
}
