import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Gauge, Users } from "lucide-react";
import type { Dictionary } from "@/lib/content/dictionary";

const icons = [ShieldCheck, Gauge, Users];

export function WhyChooseUs({
  dict,
}: {
  dict: Dictionary["home"]["whyChooseUs"];
}) {
  return (
    <Section tone="muted">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          align="center"
          className="mx-auto"
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {dict.reasons.map((r, i) => {
            const Icon = icons[i];
            return (
              <Card key={i} className="p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/[0.08] text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-normal text-ink">
                  {r.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {r.body}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
