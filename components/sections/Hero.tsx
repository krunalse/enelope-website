import Image from "@/components/ui/Image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Dictionary } from "@/lib/content/dictionary";

interface HeroProps {
  dict: Dictionary["home"]["hero"];
}

export function Hero({ dict }: HeroProps) {
  return (
    <section className="relative flex min-h-[min(calc(100svh-5rem),52rem)] items-center overflow-hidden bg-[#06070b] py-14 sm:py-20">
      {/* Full-bleed photo (human and robotic hand); the robotic hand sits right of the copy. */}
      <Image
        src="/images/hero/hero-photo.webp"
        alt=""
        fill
        fetchPriority="high"
        sizes="100vw"
        className="pointer-events-none object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#06070b] via-[#06070b]/80 to-[#06070b]/60 sm:to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06070b]/70 via-transparent to-transparent"
      />

      <Container className="relative">
        <div className="animate-fade-up">
          <Badge className="border-indigo-200/25 bg-indigo-200/10 text-indigo-100">
            {dict.badge}
          </Badge>

          <h1 className="mt-7 max-w-[18ch] font-display text-[2.8125rem] font-semibold leading-[1.08] text-white sm:text-[3.5625rem] lg:text-[4.0625rem]">
            {dict.title}
          </h1>

          <p className="mt-6 max-w-[46ch] text-[1.25rem] leading-8 text-slate-300">
            {dict.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink
              href="/contact"
              className="!bg-white !text-[#06070b] hover:!bg-indigo-100 sm:min-w-0"
            >
              {dict.startProject}
            </ButtonLink>
            <ButtonLink
              href="/industries"
              variant="secondary"
              className="!border-white/25 !bg-white/10 !text-white hover:!bg-white/20"
            >
              {dict.exploreIndustries}
            </ButtonLink>
          </div>

          <ul className="mt-12 flex max-w-2xl flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/70">
            {dict.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check aria-hidden className="h-4 w-4 text-signal-bright" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
