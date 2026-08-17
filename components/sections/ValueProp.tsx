import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function ValueProp({ dict }: { dict: Dictionary["home"]["valueProp"] }) {
  const points = [
    { stat: dict.stat1Value, label: dict.stat1Label },
    { stat: dict.stat2Value, label: dict.stat2Label },
    { stat: dict.stat3Value, label: dict.stat3Label },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {points.map((p, i) => (
            <div key={i}>
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
