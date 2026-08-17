import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function Capabilities({ dict }: { dict: Dictionary["home"]["capabilities"] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/8 bg-ink/8 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((c, i) => (
            <div
              key={i}
              className="bg-surface p-6 dark:bg-surface-dark-muted"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-brand dark:text-signal">
                {c.label}
              </p>
              <p className="mt-2 text-sm text-ink-soft dark:text-white/60">
                {c.detail}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
