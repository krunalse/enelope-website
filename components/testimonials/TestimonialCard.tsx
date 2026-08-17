import Image from "next/image";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <div className="flex gap-1 text-signal">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink dark:text-white/80">
          &ldquo;{testimonial.testimonial}&rdquo;
        </p>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand/10 font-display text-sm font-medium text-brand dark:bg-signal/15 dark:text-signal">
          {testimonial.avatarUrl ? (
            <Image
              src={testimonial.avatarUrl}
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            testimonial.customerName.charAt(0)
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-ink dark:text-white">
            {testimonial.customerName}
          </p>
          <p className="text-xs text-ink-soft dark:text-white/50">
            {testimonial.customerRole}, {testimonial.companyName}
          </p>
        </div>
      </div>
    </Card>
  );
}
