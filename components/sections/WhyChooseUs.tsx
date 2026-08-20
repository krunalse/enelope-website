import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Gauge, Users } from "lucide-react";
import type { Dictionary } from "@/lib/content/dictionary";

const icons = [ShieldCheck, Gauge, Users];

export function WhyChooseUs({ dict }: { dict: Dictionary["home"]["whyChooseUs"] }) {
  return (
    <section className="bg-surface-muted py-20 dark:bg-surface-dark-muted/40 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {dict.reasons.map((r, i) => {
            const Icon = icons[i];
            return (
              <Card key={i}>
                <Icon className="h-6 w-6 text-brand dark:text-signal" />
                <h3 className="mt-4 font-display text-lg font-medium text-ink dark:text-white">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/60">
                  {r.body}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
