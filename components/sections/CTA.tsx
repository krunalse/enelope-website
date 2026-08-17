import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[locale]/dictionaries";

interface CTAProps {
  locale: Locale;
  dict: Dictionary["home"]["cta"];
}

export function CTA({ locale, dict }: CTAProps) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center dark:bg-surface-dark-muted sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-signal-glow opacity-50 dark:opacity-30"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-xl font-display text-3xl font-medium text-white sm:text-4xl">
              {dict.title}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/70">
              {dict.subtitle}
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href={`/${locale}/contact`} variant="primary">
                {dict.startProject}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
