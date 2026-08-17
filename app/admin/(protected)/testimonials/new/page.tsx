import type { Metadata } from "next";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { createTestimonial } from "@/app/admin/(protected)/testimonials/actions";

export const metadata: Metadata = {
  title: "New Testimonial",
};

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink dark:text-white">
        New testimonial
      </h1>
      <div className="mt-8 max-w-2xl">
        <TestimonialForm action={createTestimonial} submitLabel="Create testimonial" />
      </div>
    </div>
  );
}
