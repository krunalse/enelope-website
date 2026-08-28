import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const styles = {
  primary:
    "bg-brand text-white shadow-soft hover:bg-brand-dark hover:shadow-lift active:translate-y-px",
  secondary:
    "border border-ink/15 bg-surface/60 text-ink backdrop-blur hover:border-brand/40 hover:bg-surface hover:text-brand active:translate-y-px",
  ghost: "text-ink hover:text-brand active:translate-y-px",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out " +
  "disabled:pointer-events-none disabled:opacity-50";

type Variant = keyof typeof styles;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return <button className={cn(base, styles[variant], className)} {...props} />;
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
    <Link
      href={href}
      className={cn(base, styles[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
