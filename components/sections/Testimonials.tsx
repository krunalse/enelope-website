import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { getActiveTestimonials } from "@/lib/supabase/queries";

export async function Testimonials() {
  const testimonials = await getActiveTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="From clients"
          title="What it's like to work with us."
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
