import Image from "next/image";
import Link from "next/link";
import { SERVICE_ICON_OPTIONS } from "@/lib/utils/serviceIcons";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ServiceRow } from "@/lib/supabase/queries";

const inputClass =
  "w-full rounded-xl border border-ink/12 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-brand dark:border-white/15 dark:bg-surface-dark-muted dark:text-white dark:placeholder:text-white/30 dark:focus:border-signal";

const labelClass = "mb-1.5 block text-sm font-medium text-ink dark:text-white";

interface ServiceFormProps {
  action: (formData: FormData) => void;
  service?: ServiceRow | null;
  submitLabel: string;
}

export function ServiceForm({ action, service, submitLabel }: ServiceFormProps) {
  return (
    <form action={action} className="space-y-6" encType="multipart/form-data">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={service?.title}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            placeholder="auto-generated from title if left blank"
            defaultValue={service?.slug}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="short_description" className={labelClass}>
          Short description
        </label>
        <textarea
          id="short_description"
          name="short_description"
          required
          rows={2}
          defaultValue={service?.short_description}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="full_description" className={labelClass}>
          Full description
        </label>
        <textarea
          id="full_description"
          name="full_description"
          required
          rows={5}
          defaultValue={service?.full_description}
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="icon" className={labelClass}>
            Icon
          </label>
          <select
            id="icon"
            name="icon"
            defaultValue={service?.icon ?? SERVICE_ICON_OPTIONS[0]}
            className={inputClass}
          >
            {SERVICE_ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="image" className={labelClass}>
            Image {service?.image_url ? "(replace)" : ""}
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className={`${inputClass} file:mr-3 file:rounded-full file:border-0 file:bg-brand file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white dark:file:bg-signal dark:file:text-surface-dark`}
          />
          {service?.image_url && (
            <div className="mt-3 h-16 w-16 overflow-hidden rounded-lg border border-ink/10 dark:border-white/10">
              <Image
                src={service.image_url}
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-ink dark:text-white">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={service?.is_active ?? true}
          className="h-4 w-4 rounded border-ink/20 text-brand focus:ring-signal dark:border-white/20"
        />
        Active (visible on the public site)
      </label>

      <div className="flex items-center gap-4">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/services"
          className="text-sm font-medium text-ink-soft hover:text-brand dark:text-white/60 dark:hover:text-signal"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
