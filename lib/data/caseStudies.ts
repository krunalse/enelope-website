export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  summary: string;
  result: string;
}

// Case Studies are static content per the architecture plan — built directly
// into Next.js rather than pulled from Supabase.
export const caseStudies: CaseStudy[] = [
  {
    slug: "larkspur-logistics",
    client: "Larkspur Logistics",
    industry: "Supply Chain",
    summary:
      "Built a triage agent that reads incoming support tickets, checks shipment status across three systems, and drafts a resolution for review.",
    result: "68% of tickets now resolved without a human draft from scratch.",
  },
  {
    slug: "northfield-analytics",
    client: "Northfield Analytics",
    industry: "Data & Analytics",
    summary:
      "Migrated inference workloads to a right-sized cloud architecture, replacing a generic always-on setup with autoscaling built for actual traffic patterns.",
    result: "41% reduction in monthly cloud spend.",
  },
  {
    slug: "solvent-home-goods",
    client: "Solvent Home Goods",
    industry: "E-commerce",
    summary:
      "Ran a two-week consulting sprint to rank automation opportunities, then shipped a product-support chatbot grounded in the catalog and return policy.",
    result: "Chatbot live in 6 weeks; deflects 35% of pre-purchase questions.",
  },
];
