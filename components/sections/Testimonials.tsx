import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { getActiveTestimonials } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[locale]/dictionaries";

interface TestimonialsProps {
  locale: Locale;
  dict: Dictionary["home"]["testimonialsSection"];
}

export async function Testimonials({ locale, dict }: TestimonialsProps) {
  const testimonials = await getActiveTestimonials(locale);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
