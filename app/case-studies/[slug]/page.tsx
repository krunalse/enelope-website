import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content/data";
import { dictionary } from "@/lib/content/dictionary";

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.clientName,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dict = dictionary.caseStudyDetail;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  // Some entries set fullDescription to just"summary + result", which the masthead
  // and pull-quote already show. Only render the body when it adds something.
  const squash = (s: string) => s.replace(/\s+/g, " ").trim();
  const hasBody =
    squash(caseStudy.fullDescription) !==
    squash(`${caseStudy.summary} ${caseStudy.result}`);

  return (
    <article>
      <header className="relative isolate overflow-hidden bg-ink">
        {caseStudy.imageUrl && (
          <Image
            src={caseStudy.imageUrl}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-45"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/80 to-ink"
        />

        <Container className="relative max-w-3xl py-20 sm:py-24">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            {dict.allCaseStudies}
          </Link>

          <p className="mt-10 font-mono text-[0.6875rem] uppercase tracking-eyebrow text-signal-bright">
            {caseStudy.industry}
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] font-normal leading-[1.1] text-white sm:text-5xl">
            {caseStudy.clientName}
          </h1>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/70">
            {caseStudy.summary}
          </p>
        </Container>
      </header>

      <Container className="max-w-3xl py-20 sm:py-24">
        {/* The headline number is the reason to read the page — lead with it. */}
        <p className="border-l-2 border-brand pl-6 font-display text-[1.75rem] font-normal leading-snug text-ink">
          {caseStudy.result}
        </p>

        {hasBody && (
          <div className="mt-12">
            <Prose>
              <ReactMarkdown>{caseStudy.fullDescription}</ReactMarkdown>
            </Prose>
          </div>
        )}

        <div className="mt-14 border-t border-ink/[0.07] pt-10">
          <ButtonLink href="/contact">
            {dict.talkToUsAbout.replace("{client}", caseStudy.clientName)}
          </ButtonLink>
        </div>
      </Container>
    </article>
  );
}
