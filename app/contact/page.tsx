import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { getServices } from "@/lib/content/data";
import { dictionary } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: dictionary.meta.contact.title,
  description: dictionary.meta.contact.description,
};

export default function ContactPage() {
  const dict = dictionary;
  const services = getServices();

  return (
    <Section>
      <Container className="grid gap-14 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <SectionHeading
            as="h1"
            eyebrow={dict.contactPage.eyebrow}
            title={dict.contactPage.title}
            description={dict.contactPage.description}
          />

          <dl className="mt-12 space-y-8">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/[0.08] text-brand">
                <Mail className="h-[1.125rem] w-[1.125rem]" />
              </span>
              <div>
                <dt className="text-sm font-medium text-ink">
                  {dict.contactPage.emailLabel}
                </dt>
                <dd className="mt-0.5">
                  <a
                    href="mailto:hello@nexaai.ch"
                    className="text-sm text-ink-soft underline-offset-4 transition-colors hover:text-brand hover:underline"
                  >
                    hello@nexaai.ch
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/[0.08] text-brand">
                <Clock className="h-[1.125rem] w-[1.125rem]" />
              </span>
              <div>
                <dt className="text-sm font-medium text-ink">
                  {dict.contactPage.responseTimeLabel}
                </dt>
                <dd className="mt-0.5 text-sm text-ink-soft">
                  {dict.contactPage.responseTimeValue}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-3">
          <ContactForm services={services} dict={dict.contactForm} />
        </div>
      </Container>
    </Section>
  );
}
