import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/[0.06] px-3.5 py-1.5",
        "font-mono text-[0.6875rem] uppercase tracking-eyebrow text-brand",
        className,
      )}
      {...props}
    />
  );
}
