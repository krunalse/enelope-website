import type { Metadata } from "next";
import { SolutionsPage } from "@/components/solutions/SolutionsPage";
import { getUseCases } from "@/lib/content/solutions";
import { dictionary } from "@/lib/content/dictionary";

export const metadata: Metadata = {
  title: dictionary.meta.useCases.title,
  description: dictionary.meta.useCases.description,
};

export default function UseCasesPage() {
  return (
    <SolutionsPage
      solutions={getUseCases()}
      basePath="/use-cases"
      dict={dictionary.useCasesPage}
    />
  );
}
