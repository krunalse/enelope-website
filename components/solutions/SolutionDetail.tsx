import Image from "@/components/ui/Image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";
import { getServiceIcon } from "@/lib/utils/serviceIcons";
import type { Solution } from "@/types";

interface SolutionDetailProps {
  solution: Solution;
  backHref: string;
  backLabel: string;
  ctaLabel: string;
  related: { heading: string; basePath: string; items: Solution[] };
}

export function SolutionDetail({
  solution,
  backHref,
  backLabel,
  ctaLabel,
  related,
}: SolutionDetailProps) {
  const Icon = getServiceIcon(solution.icon);

  return (
    <article>
      <header className="relative isolate overflow-hidden bg-ink">
        <Image
          src={solution.imageUrl}
          alt=""
          fill
          sizes="100vw"
          priority
          className="opacity-45 object-cover"
        />

        <Container className="relative max-w-3xl py-20 sm:py-24">
          <Link
            href={backHref}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            {backLabel}
          </Link>

          <div className="mt-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-signal-bright backdrop-blur">
            <Icon className="h-7 w-7" />
          </div>

          <h1 className="mt-7 font-display text-[2.8125rem] font-semibold leading-[1.1] text-white sm:text-5xl">
            {solution.title}
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1.25rem] leading-8 text-white/70">
            {solution.description}
          </p>
        </Container>
      </header>

      <Container className="max-w-3xl py-20 sm:py-24">
        <Prose>
          <ReactMarkdown>{solution.body}</ReactMarkdown>
        </Prose>

        {related.items.length > 0 && (
          <div className="mt-14 border-t border-ink/[0.07] pt-10">
            <p className="eyebrow">{related.heading}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`${related.basePath}/${item.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-ink/[0.07] px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    {item.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 border-t border-ink/[0.07] pt-10">
          <ButtonLink href="/contact">{ctaLabel}</ButtonLink>
        </div>
      </Container>
    </article>
  );
}
