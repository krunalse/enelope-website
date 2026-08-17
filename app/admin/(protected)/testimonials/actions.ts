"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { createClient } from "@/lib/supabase/server";
import { getAllTestimonialsForAdmin } from "@/lib/supabase/queries";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/locales";

const BUCKET = "testimonial-avatars";

async function uploadAvatar(
  supabase: ReturnType<typeof createClient>,
  file: File,
  existingPath?: string | null
): Promise<{ avatar_url: string; avatar_path: string }> {
  if (existingPath) {
    await supabase.storage.from(BUCKET).remove([existingPath]);
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: true,
  });
  if (error) throw new Error(`Avatar upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { avatar_url: data.publicUrl, avatar_path: path };
}

function readTestimonialFields(formData: FormData) {
  const rating = Number(formData.get("rating") ?? 5);

  const translations = Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      {
        testimonial: String(formData.get(`testimonial_${locale}`) ?? "").trim(),
        customer_role: String(formData.get(`customer_role_${locale}`) ?? "").trim(),
      },
    ])
  ) as Record<(typeof LOCALES)[number], { testimonial: string; customer_role: string }>;

  return {
    customer_name: String(formData.get("customer_name") ?? "").trim(),
    company_name: String(formData.get("company_name") ?? "").trim(),
    rating: Number.isFinite(rating) ? Math.min(5, Math.max(1, rating)) : 5,
    is_active: formData.get("is_active") === "on",
    translations,
  };
}

async function saveTranslations(
  supabase: ReturnType<typeof createClient>,
  testimonialId: string,
  translations: ReturnType<typeof readTestimonialFields>["translations"]
) {
  const rows = LOCALES.map((locale) => ({
    testimonial_id: testimonialId,
    locale,
    ...translations[locale],
  }));
  const { error } = await supabase
    .from("testimonial_translations")
    .upsert(rows, { onConflict: "testimonial_id,locale" });
  if (error) throw new Error(error.message);
}

function revalidateTestimonialPaths() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin");
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}`);
  }
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const fields = readTestimonialFields(formData);
  const en = fields.translations[DEFAULT_LOCALE];

  if (!fields.customer_name || !fields.company_name || !en.testimonial) {
    throw new Error("Customer name, company, and English testimonial are required.");
  }

  const existing = await getAllTestimonialsForAdmin();
  const nextOrder = existing.length
    ? Math.max(...existing.map((t) => t.display_order)) + 1
    : 1;

  let avatarFields: { avatar_url: string; avatar_path: string } | null = null;
  const avatar = formData.get("avatar");
  if (avatar instanceof File && avatar.size > 0) {
    avatarFields = await uploadAvatar(supabase, avatar);
  }

  const { data: inserted, error } = await supabase
    .from("testimonials")
    .insert({
      customer_name: fields.customer_name,
      company_name: fields.company_name,
      rating: fields.rating,
      is_active: fields.is_active,
      display_order: nextOrder,
      testimonial: en.testimonial,
      customer_role: en.customer_role,
      avatar_url: avatarFields?.avatar_url ?? null,
      avatar_path: avatarFields?.avatar_path ?? null,
    })
    .select("id")
    .single();

  if (error || !inserted) throw new Error(error?.message ?? "Failed to create testimonial.");

  await saveTranslations(supabase, inserted.id, fields.translations);

  revalidateTestimonialPaths();
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const fields = readTestimonialFields(formData);
  const en = fields.translations[DEFAULT_LOCALE];

  if (!fields.customer_name || !fields.company_name || !en.testimonial) {
    throw new Error("Customer name, company, and English testimonial are required.");
  }

  const { data: current } = await supabase
    .from("testimonials")
    .select("avatar_path")
    .eq("id", id)
    .single();

  const update: Record<string, unknown> = {
    customer_name: fields.customer_name,
    company_name: fields.company_name,
    rating: fields.rating,
    is_active: fields.is_active,
    testimonial: en.testimonial,
    customer_role: en.customer_role,
  };

  const avatar = formData.get("avatar");
  if (avatar instanceof File && avatar.size > 0) {
    const avatarFields = await uploadAvatar(supabase, avatar, current?.avatar_path ?? null);
    update.avatar_url = avatarFields.avatar_url;
    update.avatar_path = avatarFields.avatar_path;
  }

  const { error } = await supabase.from("testimonials").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  await saveTranslations(supabase, id, fields.translations);

  revalidateTestimonialPaths();
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { data: current } = await supabase
    .from("testimonials")
    .select("avatar_path")
    .eq("id", id)
    .single();

  if (current?.avatar_path) {
    await supabase.storage.from(BUCKET).remove([current.avatar_path]);
  }

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateTestimonialPaths();
  redirect("/admin/testimonials");
}

export async function toggleTestimonialActive(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  const isActive = formData.get("is_active") === "true";
  if (!id) return;

  const { error } = await supabase
    .from("testimonials")
    .update({ is_active: !isActive })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidateTestimonialPaths();
}

export async function moveTestimonial(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || (direction !== "up" && direction !== "down")) return;

  const testimonials = await getAllTestimonialsForAdmin();
  const index = testimonials.findIndex((t) => t.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= testimonials.length) return;

  const current = testimonials[index];
  const swap = testimonials[swapIndex];

  await Promise.all([
    supabase
      .from("testimonials")
      .update({ display_order: swap.display_order })
      .eq("id", current.id),
    supabase
      .from("testimonials")
      .update({ display_order: current.display_order })
      .eq("id", swap.id),
  ]);

  revalidateTestimonialPaths();
}
