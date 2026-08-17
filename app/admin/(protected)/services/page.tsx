import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowUp, ArrowDown, Pencil } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { getAllServicesForAdmin } from "@/lib/supabase/queries";
import { getServiceIcon } from "@/lib/utils/serviceIcons";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { toggleServiceActive, deleteService, moveService } from "./actions";

export const metadata: Metadata = {
  title: "Services",
};

export default async function AdminServicesPage() {
  const services = await getAllServicesForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium text-ink dark:text-white">
          Services
        </h1>
        <ButtonLink href="/admin/services/new" className="!px-5 !py-2.5 text-sm">
          <Plus className="h-4 w-4" /> New service
        </ButtonLink>
      </div>

      {services.length === 0 ? (
        <p className="mt-8 text-sm text-ink-soft dark:text-white/60">
          No services yet. Add your first one.
        </p>
      ) : (
        <div className="mt-8 space-y-3">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <Card
                key={service.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <form action={moveService}>
                      <input type="hidden" name="id" value={service.id} />
                      <input type="hidden" name="direction" value="up" />
                      <button
                        type="submit"
                        disabled={index === 0}
                        aria-label="Move up"
                        className="rounded p-1 text-ink-soft hover:text-brand disabled:opacity-30 dark:text-white/50 dark:hover:text-signal"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                    </form>
                    <form action={moveService}>
                      <input type="hidden" name="id" value={service.id} />
                      <input type="hidden" name="direction" value="down" />
                      <button
                        type="submit"
                        disabled={index === services.length - 1}
                        aria-label="Move down"
                        className="rounded p-1 text-ink-soft hover:text-brand disabled:opacity-30 dark:text-white/50 dark:hover:text-signal"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </form>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand/10 text-brand dark:bg-signal/15 dark:text-signal">
                    {service.image_url ? (
                      <Image
                        src={service.image_url}
                        alt=""
                        width={44}
                        height={44}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink dark:text-white">
                      {service.title}
                    </p>
                    <p className="truncate text-sm text-ink-soft dark:text-white/50">
                      /{service.slug}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:ml-auto sm:justify-end">
                  <Badge
                    className={
                      service.is_active
                        ? undefined
                        : "bg-ink/5 text-ink-soft dark:bg-white/5 dark:text-white/40"
                    }
                  >
                    {service.is_active ? "Active" : "Inactive"}
                  </Badge>

                  <form action={toggleServiceActive}>
                    <input type="hidden" name="id" value={service.id} />
                    <input type="hidden" name="is_active" value={String(service.is_active)} />
                    <button
                      type="submit"
                      className="text-sm font-medium text-brand hover:underline dark:text-signal"
                    >
                      {service.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </form>

                  <Link
                    href={`/admin/services/${service.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-brand dark:text-white/60 dark:hover:text-signal"
                  >
                    <Pencil className="h-4 w-4" /> Edit
                  </Link>

                  <form action={deleteService}>
                    <input type="hidden" name="id" value={service.id} />
                    <DeleteButton
                      variant="ghost"
                      className="!px-0 !py-0 text-red-600 hover:!text-red-700 dark:text-red-400"
                    />
                  </form>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
