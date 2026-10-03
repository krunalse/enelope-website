import fs from "node:fs";
import path from "node:path";
import type { Solution } from "@/types";

export type SolutionKind = "industries" | "use-cases";

// Display order; a markdown file not listed here is ignored.
const ORDER: Record<SolutionKind, string[]> = {
  industries: [
    "financial-services",
    "healthcare",
    "manufacturing",
    "retail-ecommerce",
    "logistics",
    "real-estate",
    "telecom",
    "professional-services",
  ],
  "use-cases": [
    "customer-support-automation",
    "enterprise-knowledge-assistant",
    "document-processing",
    "lead-qualification",
    "internal-helpdesk",
    "compliance-review",
    "reporting-agent",
    "workflow-automation",
  ],
};

/** Minimal `key: value` frontmatter; values are single-line plain text. */
function parse(kind: SolutionKind, slug: string): Solution {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content", kind, `${slug}.md`),
    "utf8",
  );
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`content/${kind}/${slug}.md: missing frontmatter`);

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  for (const key of ["title", "description", "icon"]) {
    if (!meta[key]) throw new Error(`content/${kind}/${slug}.md: missing "${key}"`);
  }

  return {
    slug,
    title: meta.title,
    description: meta.description,
    icon: meta.icon,
    imageUrl: `/images/${kind}/${slug}.webp`,
    body: match[2].trim(),
    industries: (meta.industries ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };
}

export function getSolutions(kind: SolutionKind): Solution[] {
  return ORDER[kind].map((slug) => parse(kind, slug));
}

export function getSolutionBySlug(
  kind: SolutionKind,
  slug: string,
): Solution | null {
  return ORDER[kind].includes(slug) ? parse(kind, slug) : null;
}

export const getIndustries = () => getSolutions("industries");
export const getUseCases = () => getSolutions("use-cases");
