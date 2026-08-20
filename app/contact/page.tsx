import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
