import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getActiveServices, getServiceBySlug } from "@/lib/supabase/queries";
import { getServiceIcon } from "@/lib/utils/serviceIcons";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await getActiveServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
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
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = getServiceIcon(service.icon);

  return (
    <div className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Link
          href="/services"
          className="flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-brand dark:text-white/60 dark:hover:text-signal"
        >
          <ArrowLeft className="h-4 w-4" /> All services
        </Link>

        <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand dark:bg-signal/15 dark:text-signal">
          <Icon className="h-7 w-7" />
        </div>

        <h1 className="mt-6 font-display text-4xl font-medium text-ink dark:text-white">
          {service.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-white/70">
          {service.fullDescription}
        </p>

        <div className="mt-10">
          <ButtonLink href="/contact">Talk to us about {service.title}</ButtonLink>
        </div>
      </Container>
    </div>
  );
}
