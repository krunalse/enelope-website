"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { createClient } from "@/lib/supabase/server";
import { getAllServicesForAdmin } from "@/lib/supabase/queries";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/locales";

const BUCKET = "service-images";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uploadImage(
  supabase: ReturnType<typeof createClient>,
  file: File,
  existingPath?: string | null
): Promise<{ image_url: string; image_path: string }> {
  if (existingPath) {
    await supabase.storage.from(BUCKET).remove([existingPath]);
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: true,
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { image_url: data.publicUrl, image_path: path };
}

function readServiceFields(formData: FormData) {
  const slugInput = String(formData.get("slug") ?? "").trim();
  const englishTitle = String(formData.get(`title_${DEFAULT_LOCALE}`) ?? "").trim();

  const translations = Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      {
        title: String(formData.get(`title_${locale}`) ?? "").trim(),
        short_description: String(formData.get(`short_description_${locale}`) ?? "").trim(),
        full_description: String(formData.get(`full_description_${locale}`) ?? "").trim(),
      },
    ])
  ) as Record<
    (typeof LOCALES)[number],
    { title: string; short_description: string; full_description: string }
  >;

  return {
    slug: slugify(slugInput || englishTitle),
    icon: String(formData.get("icon") ?? "Bot"),
    is_active: formData.get("is_active") === "on",
    translations,
  };
}

async function saveTranslations(
  supabase: ReturnType<typeof createClient>,
  serviceId: string,
  translations: ReturnType<typeof readServiceFields>["translations"]
) {
  const rows = LOCALES.map((locale) => ({
    service_id: serviceId,
    locale,
    ...translations[locale],
  }));
  const { error } = await supabase
    .from("service_translations")
    .upsert(rows, { onConflict: "service_id,locale" });
  if (error) throw new Error(error.message);
}

function revalidateServicePaths() {
  revalidatePath("/admin/services");
  revalidatePath("/admin");
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}/services`);
    revalidatePath(`/${locale}`);
  }
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const fields = readServiceFields(formData);
  const en = fields.translations[DEFAULT_LOCALE];

  if (!en.title || !en.short_description || !en.full_description) {
    throw new Error("English title, short description, and full description are required.");
  }

  const existing = await getAllServicesForAdmin();
  const nextOrder = existing.length
    ? Math.max(...existing.map((s) => s.display_order)) + 1
    : 1;

  let imageFields: { image_url: string; image_path: string } | null = null;
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    imageFields = await uploadImage(supabase, image);
  }

  const { data: inserted, error } = await supabase
    .from("services")
    .insert({
      slug: fields.slug,
      icon: fields.icon,
      is_active: fields.is_active,
      display_order: nextOrder,
      title: en.title,
      short_description: en.short_description,
      full_description: en.full_description,
      image_url: imageFields?.image_url ?? null,
      image_path: imageFields?.image_path ?? null,
    })
    .select("id")
    .single();

  if (error || !inserted) throw new Error(error?.message ?? "Failed to create service.");

  await saveTranslations(supabase, inserted.id, fields.translations);

  revalidateServicePaths();
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const fields = readServiceFields(formData);
  const en = fields.translations[DEFAULT_LOCALE];

  if (!en.title || !en.short_description || !en.full_description) {
    throw new Error("English title, short description, and full description are required.");
  }

  const { data: current } = await supabase
    .from("services")
    .select("image_path")
    .eq("id", id)
    .single();

  const update: Record<string, unknown> = {
    slug: fields.slug,
    icon: fields.icon,
    is_active: fields.is_active,
    title: en.title,
    short_description: en.short_description,
    full_description: en.full_description,
  };

  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    const imageFields = await uploadImage(supabase, image, current?.image_path ?? null);
    update.image_url = imageFields.image_url;
    update.image_path = imageFields.image_path;
  }

  const { error } = await supabase.from("services").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  await saveTranslations(supabase, id, fields.translations);

  revalidateServicePaths();
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}/services/${fields.slug}`);
  }
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { data: current } = await supabase
    .from("services")
    .select("image_path")
    .eq("id", id)
    .single();

  if (current?.image_path) {
    await supabase.storage.from(BUCKET).remove([current.image_path]);
  }

  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateServicePaths();
  redirect("/admin/services");
}

export async function toggleServiceActive(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  const isActive = formData.get("is_active") === "true";
  if (!id) return;

  const { error } = await supabase
    .from("services")
    .update({ is_active: !isActive })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidateServicePaths();
}

export async function moveService(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || (direction !== "up" && direction !== "down")) return;

  const services = await getAllServicesForAdmin();
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= services.length) return;

  const current = services[index];
  const swap = services[swapIndex];

  await Promise.all([
    supabase
      .from("services")
      .update({ display_order: swap.display_order })
      .eq("id", current.id),
    supabase
      .from("services")
      .update({ display_order: current.display_order })
      .eq("id", swap.id),
  ]);

  revalidateServicePaths();
}
