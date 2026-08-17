import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    stat: "3 weeks",
    label: "average time to first working agent",
  },
  {
    stat: "100%",
    label: "of engagements start with a no-build consulting phase",
  },
  {
    stat: "24/7",
    label: "coverage once a chatbot or agent goes live",
  },
];

export function ValueProp() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Enelope"
          title="We build the automation, not just the demo."
          description="Most AI projects stall between the prototype and production. We close that gap — grounding every agent and chatbot in your real data, your real systems, and infrastructure that holds up under real load."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {points.map((p) => (
            <div key={p.label}>
              <p className="font-display text-4xl font-semibold text-brand dark:text-signal">
                {p.stat}
              </p>
              <p className="mt-2 text-sm text-ink-soft dark:text-white/60">
                {p.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
