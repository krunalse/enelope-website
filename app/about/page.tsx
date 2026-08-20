import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { dictionary } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: dictionary.meta.about.title,
  description: dictionary.meta.about.description,
};

export default function AboutPage() {
  const dict = dictionary.about;

  return (
    <div className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {dict.values.map((v, i) => (
            <Card key={i}>
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
