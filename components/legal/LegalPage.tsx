import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

/**
 * Shared shell for /privacy and /terms — the two pages had byte-identical
 * layouts, so the rhythm and measure now live in one place.
 */
export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <Section>
      <Container className="max-w-[46rem]">
        <header className="border-b border-ink/[0.07] pb-10">
          <h1 className="font-display text-[2.5rem] font-normal leading-tight text-ink">
            {title}
          </h1>
          <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-eyebrow text-ink-faint">
            {lastUpdated}
          </p>
        </header>

        <div className="mt-12 space-y-12 text-[0.9375rem] leading-[1.75] text-ink-soft">
          {children}
        </div>
      </Container>
    </Section>
  );
}

/** One numbered section within a legal document. */
export function LegalSection({
  index,
  heading,
  children,
}: {
  index: number;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="flex items-baseline gap-3 font-display text-[1.375rem] font-normal text-ink">
        <span className="font-mono text-xs tracking-eyebrow text-ink-faint">
          {String(index).padStart(2, "0")}
        </span>
        {heading}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
