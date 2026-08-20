export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // lucide-react icon name
  imageUrl: string | null;
}

export interface CaseStudy {
  id: string;
  slug: string;
  clientName: string;
  industry: string;
  summary: string;
  result: string;
  fullDescription: string;
  imageUrl: string | null;
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
