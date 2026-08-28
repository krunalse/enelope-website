import Image from "next/image";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.customerName
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");

  return (
    <Card className="flex h-full flex-col justify-between p-7">
      <div>
        <div
          className="flex gap-0.5 text-brand-light"
          role="img"
          aria-label={`${testimonial.rating} out of 5`}
        >
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />
          ))}
        </div>

        <blockquote className="mt-5 font-display text-[1.0625rem] font-normal leading-[1.65] text-ink">
          &ldquo;{testimonial.testimonial}&rdquo;
        </blockquote>
      </div>

      <figcaption className="mt-7 flex items-center gap-3 border-t border-ink/[0.07] pt-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand/[0.08] font-mono text-xs font-medium uppercase tracking-wide text-brand">
          {testimonial.avatarUrl ? (
            <Image
              src={testimonial.avatarUrl}
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-ink">
            {testimonial.customerName}
          </p>
          <p className="text-xs text-ink-faint">
            {testimonial.customerRole}, {testimonial.companyName}
          </p>
        </div>
      </figcaption>
    </Card>
  );
}
