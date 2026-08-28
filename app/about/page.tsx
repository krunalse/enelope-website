import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
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
    <Section>
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <SectionHeading
            as="h1"
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
          />

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rotate-1 rounded-[1.75rem] bg-brand/[0.07]"
            />
            <div className="img-frame relative aspect-[5/6] w-full bg-ink shadow-frame">
              <Image
                src="/images/about/team.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {dict.values.map((v, i) => (
            <Card key={i} className="p-7">
              <p className="font-mono text-[0.6875rem] uppercase tracking-eyebrow text-brand">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 font-display text-xl font-normal text-ink">
                {v.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                {v.body}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
