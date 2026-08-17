import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[locale]/dictionaries";

interface HeroProps {
  locale: Locale;
  dict: Dictionary["home"]["hero"];
}

export function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-signal-glow opacity-60 dark:opacity-40"
      />
      <Container className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="animate-fade-up">
          <Badge>{dict.badge}</Badge>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.1] text-ink dark:text-white sm:text-5xl lg:text-[3.25rem]">
            {dict.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft dark:text-white/70">
            {dict.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href={`/${locale}/contact`}>{dict.startProject}</ButtonLink>
            <ButtonLink href={`/${locale}/case-studies`} variant="secondary">
              {dict.seeCaseStudies}
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md animate-fade-up lg:max-w-none">
          <HeroDiagram dict={dict} />
        </div>
      </Container>
    </section>
  );
}

function HeroDiagram({ dict }: { dict: Dictionary["home"]["hero"] }) {
  const nodes = [
    { x: 60, y: 60, label: dict.nodeAgents },
    { x: 340, y: 60, label: dict.nodeChatbots },
    { x: 60, y: 340, label: dict.nodeCloud },
    { x: 340, y: 340, label: dict.nodeConsulting },
  ];

  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="img"
      aria-label={dict.diagramAlt}
    >
      {nodes.map((n, i) => (
        <line
          key={i}
          x1="200"
          y1="200"
          x2={n.x}
          y2={n.y}
          className="stroke-brand/30 dark:stroke-signal/40"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
      ))}

      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r="34"
            className="fill-surface stroke-ink/10 dark:fill-surface-dark-muted dark:stroke-white/10"
            strokeWidth="1"
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            className="fill-ink font-mono text-[10px] uppercase tracking-wide dark:fill-white/80"
          >
            {n.label}
          </text>
        </g>
      ))}

      <circle
        cx="200"
        cy="200"
        r="10"
        className="fill-signal animate-pulse-node"
      />
      <circle
        cx="200"
        cy="200"
        r="22"
        className="fill-none stroke-signal/40"
        strokeWidth="1"
      />
    </svg>
  );
}
