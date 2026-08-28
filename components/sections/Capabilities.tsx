import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/content/dictionary";

export function Capabilities({
  dict,
}: {
  dict: Dictionary["home"]["capabilities"];
}) {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink/[0.07] bg-ink/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((c, i) => (
            <div
              key={i}
              className="group relative bg-surface p-7 transition-colors duration-300 hover:bg-surface-muted/60"
            >
              <span
                aria-hidden
                className="absolute left-0 top-7 h-6 w-px bg-brand/0 transition-colors duration-300 group-hover:bg-brand"
              />
              <p className="font-mono text-[0.6875rem] uppercase tracking-eyebrow text-brand">
                {c.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {c.detail}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
