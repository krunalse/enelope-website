import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import type { Dictionary } from "@/lib/content/dictionary";

interface HeroProps {
  dict: Dictionary["home"]["hero"];
}

const HERO_SLIDES = [
  { src: "/images/hero/ai-agents.webp", labelKey: "nodeAgents" },
  { src: "/images/hero/chatbots.webp", labelKey: "nodeChatbots" },
  { src: "/images/hero/cloud.webp", labelKey: "nodeCloud" },
  { src: "/images/hero/consulting.webp", labelKey: "nodeConsulting" },
] as const;

export function Hero({ dict }: HeroProps) {
  const slides = HERO_SLIDES.map((slide) => ({
    src: slide.src,
    alt: "",
    label: dict[slide.labelKey],
  }));

  return (
    <section className="relative overflow-hidden pb-8 pt-14 sm:pb-14 sm:pt-20">
      {/* Layered ambient wash + hairline grid: depth without a heavy background image. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-wash"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
      />

      <Container className="relative grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20">
        <div className="animate-fade-up">
          <Badge>{dict.badge}</Badge>

          <h1 className="mt-7 max-w-[15ch] font-display text-[2.75rem] font-normal leading-[1.08] text-ink sm:text-[3.5rem] lg:text-[4rem]">
            {dict.title}
          </h1>

          <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.75] text-ink-soft">
            {dict.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact">{dict.startProject}</ButtonLink>
            <ButtonLink href="/case-studies" variant="secondary">
              {dict.seeCaseStudies}
            </ButtonLink>
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-md animate-fade-up lg:max-w-none"
          style={{ animationDelay: "120ms" }}
        >
          {/* Offset tint block behind the frame gives the image somewhere to sit. */}
          <div
            aria-hidden
            className="absolute -inset-3 -rotate-1 rounded-[1.75rem] bg-brand/[0.07]"
          />
          <HeroCarousel slides={slides} dict={dict} />
        </div>
      </Container>
    </section>
  );
}
