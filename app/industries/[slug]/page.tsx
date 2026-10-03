import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionDetail } from "@/components/solutions/SolutionDetail";
import { getIndustries, getUseCases, getSolutionBySlug } from "@/lib/content/solutions";
import { dictionary } from "@/lib/content/dictionary";

export function generateStaticParams() {
  return getIndustries().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getSolutionBySlug("industries", slug);
  if (!industry) return {};
  return { title: industry.title, description: industry.description };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dict = dictionary.industryDetail;
  const industry = getSolutionBySlug("industries", slug);
  if (!industry) notFound();

  return (
    <SolutionDetail
      solution={industry}
      backHref="/industries"
      backLabel={dict.allIndustries}
      ctaLabel={dict.talkToUsAbout.replace("{title}", industry.title)}
      related={{
        heading: dict.relatedUseCases,
        basePath: "/use-cases",
        items: getUseCases().filter((u) => u.industries.includes(industry.slug)),
      }}
    />
  );
}
