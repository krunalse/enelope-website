import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { getActiveServices } from "@/lib/supabase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project — we reply within one business day.",
};

export default async function ContactPage() {
  const services = await getActiveServices();

  return (
    <div className="py-20 sm:py-28">
      <Container className="grid gap-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading
            eyebrow="Contact"
            title="Tell us about your project."
            description="Share a few details and we'll follow up with next steps — no sales pitch, just a straight answer on fit."
          />
          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-brand dark:text-signal" />
              <div>
                <p className="text-sm font-medium text-ink dark:text-white">Email</p>
                <p className="text-sm text-ink-soft dark:text-white/60">
                  hello@enelope.ch
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-brand dark:text-signal" />
              <div>
                <p className="text-sm font-medium text-ink dark:text-white">
                  Response time
                </p>
                <p className="text-sm text-ink-soft dark:text-white/60">
                  Within one business day
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <ContactForm services={services} />
        </div>
      </Container>
    </div>
  );
}
