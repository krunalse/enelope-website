import type { Metadata } from "next";
import { SolutionsPage } from "@/components/solutions/SolutionsPage";
import { getIndustries } from "@/lib/content/solutions";
import { dictionary } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: dictionary.meta.industries.title,
  description: dictionary.meta.industries.description,
};

export default function IndustriesPage() {
  return (
    <SolutionsPage
      solutions={getIndustries()}
      basePath="/industries"
      dict={dictionary.industriesPage}
    />
  );
}
