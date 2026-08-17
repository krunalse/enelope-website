import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Enelope is a small, senior team building AI agents, chatbots, and cloud infrastructure that actually make it to production.",
};

const values = [
  {
    title: "Honest scoping",
    body: "We turn down work we don't think will pay off, and we say so before the invoice, not after.",
  },
  {
    title: "Production over demos",
    body: "A prototype that impresses in a meeting and an agent that survives real traffic are different projects. We build the second one.",
  },
  {
    title: "Ownership transfer",
    body: "You should be able to run what we build without us. Documentation and handoff are part of every engagement.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="About Enelope"
          title="A small team that builds AI infrastructure meant to last."
          description="We started Enelope because too many AI projects stall at the prototype stage — impressive in a demo, unreliable in production. We work end to end: consulting on where automation fits, building the agents and chatbots, and standing up the cloud infrastructure underneath."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title}>
              <h3 className="font-display text-lg font-medium text-ink dark:text-white">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/60">
                {v.body}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
