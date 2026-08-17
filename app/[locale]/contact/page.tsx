import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
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
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: localeAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
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
      <Container className="grid gap-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading
            eyebrow={dict.contactPage.eyebrow}
            title={dict.contactPage.title}
            description={dict.contactPage.description}
          />
          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-brand dark:text-signal" />
              <div>
                <p className="text-sm font-medium text-ink dark:text-white">
                  {dict.contactPage.emailLabel}
                </p>
                <p className="text-sm text-ink-soft dark:text-white/60">
                  hello@enelope.ch
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-brand dark:text-signal" />
              <div>
                <p className="text-sm font-medium text-ink dark:text-white">
                  {dict.contactPage.responseTimeLabel}
                </p>
                <p className="text-sm text-ink-soft dark:text-white/60">
                  {dict.contactPage.responseTimeValue}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <ContactForm services={services} dict={dict.contactForm} />
        </div>
      </Container>
    </div>
  );
}
