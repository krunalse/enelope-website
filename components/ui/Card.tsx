import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds the hover lift. Use for cards that are themselves links. */
  interactive?: boolean;
}

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/[0.07] bg-surface shadow-soft",
        interactive && [
          "transition-[transform,box-shadow,border-color] duration-300 ease-out",
          "group-hover:-translate-y-1 group-hover:border-brand/25 group-hover:shadow-lift",
        ],
        className,
      )}
      {...props}
    />
  );
}
