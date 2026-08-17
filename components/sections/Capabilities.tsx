import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const capabilities = [
  { label: "LLM orchestration", detail: "Claude, GPT, and open-weight models" },
  { label: "Retrieval & memory", detail: "Vector search grounded in your data" },
  { label: "Workflow automation", detail: "Multi-step agents with human handoff" },
  { label: "Cloud infrastructure", detail: "AWS, GCP, and Supabase-based stacks" },
  { label: "Integrations", detail: "Slack, Teams, CRM, and internal tools" },
  { label: "Observability", detail: "Logging, evals, and cost monitoring" },
];

export function Capabilities() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Technology"
          title="A stack built for production, not demos."
          description="We're model-agnostic and infrastructure-pragmatic — the goal is the right tool for your constraints, not the newest one."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/8 bg-ink/8 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div
              key={c.label}
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
