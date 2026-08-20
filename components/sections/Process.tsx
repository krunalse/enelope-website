import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/content/dictionary";

export function Process({ dict }: { dict: Dictionary["home"]["process"] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dict.steps.map((s, i) => (
            <div key={i} className="relative pl-2">
              <p className="font-mono text-sm text-brand/50 dark:text-signal/50">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-lg font-medium text-ink dark:text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/60">
                {s.body}
              </p>
              {i < dict.steps.length - 1 && (
                <div className="mt-6 hidden h-px w-full bg-ink/8 dark:bg-white/10 lg:block" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
