import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionDetail } from "@/components/solutions/SolutionDetail";
import { getIndustries, getUseCases, getSolutionBySlug } from "@/lib/content/solutions";
import { dictionary } from "@/lib/content/dictionary";

export function generateStaticParams() {
  return getUseCases().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getSolutionBySlug("use-cases", slug);
  if (!useCase) return {};
  return { title: useCase.title, description: useCase.description };
}

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dict = dictionary.useCaseDetail;
  const useCase = getSolutionBySlug("use-cases", slug);
  if (!useCase) notFound();

  return (
    <SolutionDetail
      solution={useCase}
      backHref="/use-cases"
      backLabel={dict.allUseCases}
      ctaLabel={dict.talkToUsAbout.replace("{title}", useCase.title)}
      related={{
        heading: dict.relatedIndustries,
        basePath: "/industries",
        items: getIndustries().filter((i) => useCase.industries.includes(i.slug)),
      }}
    />
  );
}
