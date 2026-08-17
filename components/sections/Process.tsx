import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "01",
    title: "Assess",
    body: "We map your workflows and find where automation would actually change outcomes.",
  },
  {
    n: "02",
    title: "Design",
    body: "We scope the smallest version of the agent, chatbot, or infrastructure that proves the case.",
  },
  {
    n: "03",
    title: "Build",
    body: "We build against your real systems and data, with monitoring in place from day one.",
  },
  {
    n: "04",
    title: "Operate",
    body: "We hand off documentation and support your team as usage — and confidence — grows.",
  },
];

export function Process() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Process" title="How an engagement runs." />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative pl-2">
              <p className="font-mono text-sm text-brand/50 dark:text-signal/50">
                {s.n}
              </p>
              <h3 className="mt-2 font-display text-lg font-medium text-ink dark:text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/60">
                {s.body}
              </p>
              {i < steps.length - 1 && (
                <div className="mt-6 hidden h-px w-full bg-ink/8 dark:bg-white/10 lg:block" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
