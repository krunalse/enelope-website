import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/content/dictionary";

export function ValueProp({ dict }: { dict: Dictionary["home"]["valueProp"] }) {
  const points = [
    { stat: dict.stat1Value, label: dict.stat1Label },
    { stat: dict.stat2Value, label: dict.stat2Label },
    { stat: dict.stat3Value, label: dict.stat3Label },
  ];

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-ink/[0.07] sm:grid-cols-3">
          {points.map((p, i) => (
            <div key={i} className="bg-paper px-6 py-8 sm:px-8 sm:py-10">
              <dt className="sr-only">{p.label}</dt>
              <dd>
                <p className="font-display text-[3rem] font-normal leading-none text-brand">
                  {p.stat}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {p.label}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
