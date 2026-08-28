import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Renders as h1 on pages where this is the page title. */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span aria-hidden className="h-px w-6 bg-brand/40" />
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-display font-normal leading-[1.12] text-ink",
          Heading === "h1"
            ? "mt-5 text-[2.75rem] sm:text-5xl lg:text-[3.5rem]"
            : "mt-5 text-[2rem] sm:text-[2.5rem]",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 text-[1.0625rem] leading-[1.7] text-ink-soft",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
