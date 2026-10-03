import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { getTestimonials } from "@/lib/content/data";
import type { Dictionary } from "@/lib/content/dictionary";

interface TestimonialsProps {
  dict: Dictionary["home"]["testimonialsSection"];
  tone?: "default" | "muted";
}

export function Testimonials({ dict, tone = "default" }: TestimonialsProps) {
  const testimonials = getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          align="center"
          className="mx-auto"
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
