import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getServices, getServiceBySlug } from "@/lib/content/data";
import { getServiceIcon } from "@/lib/utils/serviceIcons";
import { dictionary } from "@/lib/content/dictionary";

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dict = dictionary.serviceDetail;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = getServiceIcon(service.icon);

  return (
    <div className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Link
          href="/services"
          className="flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-brand dark:text-white/60 dark:hover:text-signal"
        >
          <ArrowLeft className="h-4 w-4" /> {dict.allServices}
        </Link>

        <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand dark:bg-signal/15 dark:text-signal">
          <Icon className="h-7 w-7" />
        </div>

        <h1 className="mt-6 font-display text-4xl font-medium text-ink dark:text-white">
          {service.title}
        </h1>
        <div
          className="prose prose-lg mt-6 max-w-none prose-headings:font-display prose-headings:text-ink
            prose-p:text-ink-soft prose-p:leading-relaxed prose-li:text-ink-soft prose-strong:text-ink
            prose-a:text-brand hover:prose-a:underline dark:prose-invert dark:prose-headings:text-white
            dark:prose-p:text-white/70 dark:prose-li:text-white/70 dark:prose-strong:text-white
            dark:prose-a:text-signal"
        >
          <ReactMarkdown>{service.fullDescription}</ReactMarkdown>
        </div>

        <div className="mt-10">
          <ButtonLink href="/contact">
            {dict.talkToUsAbout.replace("{title}", service.title)}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
