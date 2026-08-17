import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getTestimonialByIdForAdmin } from "@/lib/supabase/queries";
import {
  updateTestimonial,
  deleteTestimonial,
} from "@/app/admin/(protected)/testimonials/actions";

export const metadata: Metadata = {
  title: "Edit Testimonial",
};

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialByIdForAdmin(id);
  if (!testimonial) notFound();

  const boundUpdate = updateTestimonial.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink dark:text-white">
        Edit testimonial
      </h1>
      <div className="mt-8 max-w-2xl">
        <TestimonialForm action={boundUpdate} testimonial={testimonial} submitLabel="Save changes" />
      </div>

      <div className="mt-10 max-w-2xl rounded-2xl border border-red-200 bg-red-50/50 p-6 dark:border-red-500/20 dark:bg-red-500/5">
        <h2 className="text-sm font-medium text-red-700 dark:text-red-400">Danger zone</h2>
        <p className="mt-1 text-sm text-ink-soft dark:text-white/60">
          Deleting a testimonial removes it, and its avatar, permanently.
        </p>
        <form action={deleteTestimonial} className="mt-4">
          <input type="hidden" name="id" value={testimonial.id} />
          <DeleteButton
            variant="secondary"
            pendingLabel="Deleting…"
            confirmMessage={`Delete the testimonial from "${testimonial.customer_name}"? This can't be undone.`}
            className="border-red-300 text-red-700 hover:border-red-500 hover:text-red-800 dark:border-red-500/30 dark:text-red-400"
          >
            Delete testimonial
          </DeleteButton>
        </form>
      </div>
    </div>
  );
}
