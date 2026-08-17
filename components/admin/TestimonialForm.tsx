import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { LocaleFieldTabs } from "@/components/admin/LocaleFieldTabs";
import { LOCALES, type Locale } from "@/lib/i18n/locales";
import type { TestimonialRow, TestimonialTranslations } from "@/lib/supabase/queries";

const inputClass =
  "w-full rounded-xl border border-ink/12 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-brand dark:border-white/15 dark:bg-surface-dark-muted dark:text-white dark:placeholder:text-white/30 dark:focus:border-signal";

const labelClass = "mb-1.5 block text-sm font-medium text-ink dark:text-white";

interface TestimonialFormProps {
  action: (formData: FormData) => void;
  testimonial?: (TestimonialRow & { translations: TestimonialTranslations }) | null;
  submitLabel: string;
}

export function TestimonialForm({ action, testimonial, submitLabel }: TestimonialFormProps) {
  return (
    <form action={action} className="space-y-6" encType="multipart/form-data">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="customer_name" className={labelClass}>
            Customer name
          </label>
          <input
            id="customer_name"
            name="customer_name"
            required
            defaultValue={testimonial?.customer_name}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="company_name" className={labelClass}>
            Company
          </label>
          <input
            id="company_name"
            name="company_name"
            required
            defaultValue={testimonial?.company_name}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="rating" className={labelClass}>
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          defaultValue={String(testimonial?.rating ?? 5)}
          className={`${inputClass} sm:w-48`}
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} star{n === 1 ? "" : "s"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className={labelClass}>Role &amp; testimonial</p>
        <LocaleFieldTabs
          panels={Object.fromEntries(
            LOCALES.map((locale) => {
              const t = testimonial?.translations[locale];
              return [
                locale,
                <div className="space-y-5" key={locale}>
                  <div>
                    <label htmlFor={`customer_role_${locale}`} className={labelClass}>
                      Role
                    </label>
                    <input
                      id={`customer_role_${locale}`}
                      name={`customer_role_${locale}`}
                      defaultValue={t?.customer_role}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor={`testimonial_${locale}`} className={labelClass}>
                      Testimonial
                    </label>
                    <textarea
                      id={`testimonial_${locale}`}
                      name={`testimonial_${locale}`}
                      required={locale === "en"}
                      rows={5}
                      defaultValue={t?.testimonial}
                      className={inputClass}
                    />
                  </div>
                </div>,
              ];
            })
          ) as Record<Locale, ReactNode>}
        />
      </div>

      <div>
        <label htmlFor="avatar" className={labelClass}>
          Avatar {testimonial?.avatar_url ? "(replace)" : ""}
        </label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          className={`${inputClass} file:mr-3 file:rounded-full file:border-0 file:bg-brand file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white dark:file:bg-signal dark:file:text-surface-dark`}
        />
        {testimonial?.avatar_url && (
          <div className="mt-3 h-16 w-16 overflow-hidden rounded-full border border-ink/10 dark:border-white/10">
            <Image
              src={testimonial.avatar_url}
              alt=""
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-ink dark:text-white">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={testimonial?.is_active ?? true}
          className="h-4 w-4 rounded border-ink/20 text-brand focus:ring-signal dark:border-white/20"
        />
        Active (visible on the public site)
      </label>

      <div className="flex items-center gap-4">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/testimonials"
          className="text-sm font-medium text-ink-soft hover:text-brand dark:text-white/60 dark:hover:text-signal"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
