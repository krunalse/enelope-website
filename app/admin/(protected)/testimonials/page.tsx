import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowUp, ArrowDown, Pencil, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { getAllTestimonialsForAdmin } from "@/lib/supabase/queries";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { toggleTestimonialActive, deleteTestimonial, moveTestimonial } from "./actions";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium text-ink dark:text-white">
          Testimonials
        </h1>
        <ButtonLink href="/admin/testimonials/new" className="!px-5 !py-2.5 text-sm">
          <Plus className="h-4 w-4" /> New testimonial
        </ButtonLink>
      </div>

      {testimonials.length === 0 ? (
        <p className="mt-8 text-sm text-ink-soft dark:text-white/60">
          No testimonials yet. Add your first one.
        </p>
      ) : (
        <div className="mt-8 space-y-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex flex-col gap-1">
                  <form action={moveTestimonial}>
                    <input type="hidden" name="id" value={testimonial.id} />
                    <input type="hidden" name="direction" value="up" />
                    <button
                      type="submit"
                      disabled={index === 0}
                      aria-label="Move up"
                      className="rounded p-1 text-ink-soft hover:text-brand disabled:opacity-30 dark:text-white/50 dark:hover:text-signal"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                  </form>
                  <form action={moveTestimonial}>
                    <input type="hidden" name="id" value={testimonial.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button
                      type="submit"
                      disabled={index === testimonials.length - 1}
                      aria-label="Move down"
                      className="rounded p-1 text-ink-soft hover:text-brand disabled:opacity-30 dark:text-white/50 dark:hover:text-signal"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </form>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand/10 font-display text-sm font-medium text-brand dark:bg-signal/15 dark:text-signal">
                  {testimonial.avatar_url ? (
                    <Image
                      src={testimonial.avatar_url}
                      alt=""
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    testimonial.customer_name.charAt(0)
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink dark:text-white">
                    {testimonial.customer_name}
                  </p>
                  <p className="truncate text-sm text-ink-soft dark:text-white/50">
                    {testimonial.customer_role
                      ? `${testimonial.customer_role}, ${testimonial.company_name}`
                      : testimonial.company_name}
                  </p>
                </div>

                <div className="hidden shrink-0 items-center gap-0.5 text-signal sm:flex">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:ml-auto sm:justify-end">
                <div className="flex items-center gap-0.5 text-signal sm:hidden">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>

                <Badge
                  className={
                    testimonial.is_active
                      ? undefined
                      : "bg-ink/5 text-ink-soft dark:bg-white/5 dark:text-white/40"
                  }
                >
                  {testimonial.is_active ? "Active" : "Inactive"}
                </Badge>

                <form action={toggleTestimonialActive}>
                  <input type="hidden" name="id" value={testimonial.id} />
                  <input type="hidden" name="is_active" value={String(testimonial.is_active)} />
                  <button
                    type="submit"
                    className="text-sm font-medium text-brand hover:underline dark:text-signal"
                  >
                    {testimonial.is_active ? "Deactivate" : "Activate"}
                  </button>
                </form>

                <Link
                  href={`/admin/testimonials/${testimonial.id}`}
                  className="flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-brand dark:text-white/60 dark:hover:text-signal"
                >
                  <Pencil className="h-4 w-4" /> Edit
                </Link>

                <form action={deleteTestimonial}>
                  <input type="hidden" name="id" value={testimonial.id} />
                  <DeleteButton
                    variant="ghost"
                    className="!px-0 !py-0 text-red-600 hover:!text-red-700 dark:text-red-400"
                  />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
