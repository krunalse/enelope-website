import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";
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
    <article>
      {/* Full-bleed masthead: the service photo was previously unused on this page. */}
      <header className="relative isolate overflow-hidden bg-ink">
        {service.imageUrl && (
          <Image
            src={service.imageUrl}
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
            href="/services"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            {dict.allServices}
          </Link>

          <div className="mt-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-signal-bright backdrop-blur">
            <Icon className="h-7 w-7" />
          </div>

          <h1 className="mt-7 font-display text-[2.75rem] font-normal leading-[1.1] text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/70">
            {service.shortDescription}
          </p>
        </Container>
      </header>

      <Container className="max-w-3xl py-20 sm:py-24">
        <Prose>
          <ReactMarkdown>{service.fullDescription}</ReactMarkdown>
        </Prose>

        <div className="mt-14 border-t border-ink/[0.07] pt-10">
          <ButtonLink href="/contact">
            {dict.talkToUsAbout.replace("{title}", service.title)}
          </ButtonLink>
        </div>
      </Container>
    </article>
  );
}
