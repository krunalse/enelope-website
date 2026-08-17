import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/8 bg-surface p-6 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-white/10 dark:bg-surface-dark-muted",
        className
      )}
      {...props}
    />
  );
}
