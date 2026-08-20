import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
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

  return (
    <div className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Link
          href="/case-studies"
          className="flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-brand dark:text-white/60 dark:hover:text-signal"
        >
          <ArrowLeft className="h-4 w-4" /> {dict.allCaseStudies}
        </Link>

        {caseStudy.imageUrl && (
          <div className="mt-8 h-56 w-full overflow-hidden rounded-2xl">
            <Image
              src={caseStudy.imageUrl}
              alt=""
              width={768}
              height={320}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <p className="mt-8 font-mono text-xs uppercase tracking-wide text-brand dark:text-signal">
          {caseStudy.industry}
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-ink dark:text-white">
          {caseStudy.clientName}
        </h1>
        <div
          className="prose prose-lg mt-6 max-w-none prose-headings:font-display prose-headings:text-ink
            prose-p:text-ink-soft prose-p:leading-relaxed prose-li:text-ink-soft prose-strong:text-ink
            prose-a:text-brand hover:prose-a:underline dark:prose-invert dark:prose-headings:text-white
            dark:prose-p:text-white/70 dark:prose-li:text-white/70 dark:prose-strong:text-white
            dark:prose-a:text-signal"
        >
          <ReactMarkdown>{caseStudy.fullDescription}</ReactMarkdown>
        </div>
        <p className="mt-6 text-base font-medium text-brand dark:text-signal">
          {caseStudy.result}
        </p>

        <div className="mt-10">
          <ButtonLink href="/contact">
            {dict.talkToUsAbout.replace("{client}", caseStudy.clientName)}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
