export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // lucide-react icon name
  imageUrl: string | null;
  diagram?: { src: string; alt: string };
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerRole: string;
  companyName: string;
  testimonial: string;
  avatarUrl: string | null;
  rating: number;
}

/** An industry solution or a use case page, loaded from content/<kind>/<slug>.md. */
export interface Solution {
  slug: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
  imageUrl: string;
  body: string; // markdown
  /** Industry slugs a use case applies to; empty for industries. */
  industries: string[];
}
