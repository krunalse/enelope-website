import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

/**
 * Long-form body copy. Keeps the measure near 70 characters — `prose-lg` inside
 * a 3xl container was running past 100, which is well past comfortable reading.
 */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose max-w-[68ch]",
        "prose-headings:font-display prose-headings:font-normal prose-headings:tracking-[-0.015em] prose-headings:text-ink",
        "prose-h2:mt-14 prose-h2:text-[1.75rem] prose-h3:mt-10 prose-h3:text-xl",
        "prose-p:text-[1.0625rem] prose-p:leading-[1.75] prose-p:text-ink-soft",
        "prose-li:text-ink-soft prose-li:leading-[1.7] prose-strong:font-semibold prose-strong:text-ink",
        "prose-a:font-medium prose-a:text-brand prose-a:no-underline hover:prose-a:underline",
        "prose-hr:border-ink/10",
        className,
      )}
    >
      {children}
    </div>
  );
}
