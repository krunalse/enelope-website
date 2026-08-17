import { createClient as createPublicClient } from "@/lib/supabase/public";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { Service, Testimonial } from "@/types";

// Public read functions return the same shapes as the Day 1 lib/data/*
// placeholders they replaced. Services (Day 2) and testimonials (Day 3)
// are both fully live.

export interface ServiceRow {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
  image_url: string | null;
  image_path: string | null;
  display_order: number;
  is_active: boolean;
}

export interface TestimonialRow {
  id: string;
  customer_name: string;
  customer_role: string;
  company_name: string;
  testimonial: string;
  avatar_url: string | null;
  avatar_path: string | null;
  rating: number;
  display_order: number;
  is_active: boolean;
}

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    icon: row.icon,
    imageUrl: row.image_url,
    displayOrder: row.display_order,
    isActive: row.is_active,
  };
}

function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    customerName: row.customer_name,
    customerRole: row.customer_role,
    companyName: row.company_name,
    testimonial: row.testimonial,
    avatarUrl: row.avatar_url,
    rating: row.rating,
    displayOrder: row.display_order,
    isActive: row.is_active,
  };
}

export async function getActiveServices(): Promise<Service[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getActiveServices failed:", error);
    return [];
  }
  return (data as ServiceRow[]).map(mapService);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return mapService(data as ServiceRow);
}

export async function getActiveTestimonials(): Promise<Testimonial[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getActiveTestimonials failed:", error);
    return [];
  }
  return (data as TestimonialRow[]).map(mapTestimonial);
}

// Admin read functions use the cookie-aware SSR client and return raw rows
// (snake_case, includes inactive rows and image_path) since the admin UI
// works directly against the database shape. Only call these from within
// app/admin/(protected) — that layout already enforces the auth check.

export async function getAllServicesForAdmin(): Promise<ServiceRow[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getAllServicesForAdmin failed:", error);
    return [];
  }
  return data as ServiceRow[];
}

export async function getServiceByIdForAdmin(id: string): Promise<ServiceRow | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as ServiceRow;
}

export async function getAllTestimonialsForAdmin(): Promise<TestimonialRow[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getAllTestimonialsForAdmin failed:", error);
    return [];
  }
  return data as TestimonialRow[];
}

export async function getTestimonialByIdForAdmin(id: string): Promise<TestimonialRow | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as TestimonialRow;
}
