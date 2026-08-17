import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getActiveServices, getServiceBySlug } from "@/lib/supabase/queries";
import { getServiceIcon } from "@/lib/utils/serviceIcons";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "../../dictionaries";
import { localeAlternates } from "@/lib/i18n/alternates";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await getActiveServices("en");
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const service = await getServiceBySlug(slug, locale);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: localeAlternates(locale, `/services/${slug}`),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const dict = (await getDictionary(locale)).serviceDetail;
  const service = await getServiceBySlug(slug, locale);
  if (!service) notFound();

  const Icon = getServiceIcon(service.icon);

  return (
    <div className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Link
          href={`/${locale}/services`}
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
        <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-white/70">
          {service.fullDescription}
        </p>

        <div className="mt-10">
          <ButtonLink href={`/${locale}/contact`}>
            {dict.talkToUsAbout.replace("{title}", service.title)}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
