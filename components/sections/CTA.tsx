import Image from "@/components/ui/Image";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/content/dictionary";

interface CTAProps {
  dict: Dictionary["home"]["cta"];
}

export function CTA({ dict }: CTAProps) {
  return (
    <Section className="!px-0 !py-0">
      <div>
        <div className="relative overflow-hidden bg-ink px-8 py-28 text-center sm:px-16 lg:py-40">
          <Image
            src="/images/hero/chatbots.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-brand-dark/90"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
          />

          <div className="relative">
            <h2 className="mx-auto max-w-[20ch] font-display text-[2.3125rem] font-semibold leading-[1.15] text-white sm:text-[3.0625rem]">
              {dict.title}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[1.25rem] leading-8 text-white/70">
              {dict.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink
                href="/contact"
                className="bg-white text-ink shadow-lift hover:bg-signal-bright hover:text-ink"
              >
                {dict.startProject}
              </ButtonLink>
              <ButtonLink
                href="/use-cases"
                variant="secondary"
                className="!border-white/25 !bg-white/10 !text-white hover:!bg-white/20"
              >
                {dict.browseUseCases}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
