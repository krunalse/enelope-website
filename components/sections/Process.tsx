import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/content/dictionary";

export function Process({ dict }: { dict: Dictionary["home"]["process"] }) {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* One continuous rule behind all four steps reads as a timeline. */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[0.4375rem] hidden h-px bg-gradient-to-r from-brand/25 via-ink/10 to-transparent lg:block"
          />

          {dict.steps.map((s, i) => (
            <li key={i} className="relative lg:pr-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-brand bg-paper"
                />
                <span className="font-mono text-xs tracking-eyebrow text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-normal text-ink">
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
