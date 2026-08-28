import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

type Tone = "default" | "muted" | "ink";

const tones: Record<Tone, string> = {
  default: "bg-paper",
  muted: "bg-surface-muted border-y border-ink/[0.06]",
  ink: "bg-ink text-white",
};

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: Tone;
  /** Tighten the vertical rhythm for secondary bands. */
  size?: "default" | "compact";
}

/**
 * Single source of truth for vertical rhythm. Every band on the site uses this
 * so a spacing change is one edit rather than a find-and-replace across pages.
 */
export function Section({
  tone = "default",
  size = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        size === "default" ? "py-24 sm:py-32" : "py-16 sm:py-20",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
