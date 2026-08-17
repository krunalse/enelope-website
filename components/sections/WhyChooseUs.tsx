import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Gauge, Users } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "We say no to bad ideas",
    body: "If automation isn't the right call, we tell you before you pay for it — not after.",
  },
  {
    icon: Gauge,
    title: "Built to run, not just to demo",
    body: "Every agent and chatbot ships with monitoring, fallbacks, and a plan for when it's wrong.",
  },
  {
    icon: Users,
    title: "Your team stays in control",
    body: "We hand off documentation and ownership — no black boxes, no permanent dependency on us.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-surface-muted py-20 dark:bg-surface-dark-muted/40 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why choose Enelope"
          title="Automation that earns your trust before it earns autonomy."
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {reasons.map((r) => (
            <Card key={r.title}>
              <r.icon className="h-6 w-6 text-brand dark:text-signal" />
              <h3 className="mt-4 font-display text-lg font-medium text-ink dark:text-white">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/60">
                {r.body}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
