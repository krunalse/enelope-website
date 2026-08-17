export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // lucide-react icon name
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerRole: string;
  companyName: string;
  testimonial: string;
  avatarUrl: string | null;
  rating: number;
  displayOrder: number;
  isActive: boolean;
}
