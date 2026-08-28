import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/content/dictionary";

interface CTAProps {
  dict: Dictionary["home"]["cta"];
}

export function CTA({ dict }: CTAProps) {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-20 text-center shadow-frame sm:px-16">
          <Image
            src="/images/hero/chatbots.webp"
            alt=""
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover opacity-30"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-brand-dark/90"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"
          />

          <div className="relative">
            <h2 className="mx-auto max-w-[20ch] font-display text-[2.25rem] font-normal leading-[1.15] text-white sm:text-[3rem]">
              {dict.title}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/70">
              {dict.subtitle}
            </p>
            <div className="mt-10 flex justify-center">
              <ButtonLink
                href="/contact"
                className="bg-white text-ink shadow-lift hover:bg-signal-bright hover:text-ink"
              >
                {dict.startProject}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
