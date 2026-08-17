import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const styles = {
  primary:
    "bg-brand text-white hover:bg-brand-dark dark:bg-signal dark:text-surface-dark dark:hover:bg-signal-bright",
  secondary:
    "bg-transparent text-ink border border-ink/15 hover:border-brand hover:text-brand dark:text-white dark:border-white/15 dark:hover:border-signal dark:hover:text-signal",
  ghost:
    "bg-transparent text-ink hover:text-brand dark:text-white dark:hover:text-signal",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200";

type Variant = keyof typeof styles;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, styles[variant], className)} {...props} />
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, styles[variant], className)} {...props}>
      {children}
    </Link>
  );
}
