import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getServiceByIdForAdmin } from "@/lib/supabase/queries";
import { updateService, deleteService } from "@/app/admin/(protected)/services/actions";

export const metadata: Metadata = {
  title: "Edit Service",
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceByIdForAdmin(id);
  if (!service) notFound();

  const boundUpdate = updateService.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink dark:text-white">
        Edit service
      </h1>
      <div className="mt-8 max-w-2xl">
        <ServiceForm action={boundUpdate} service={service} submitLabel="Save changes" />
      </div>

      <div className="mt-10 max-w-2xl rounded-2xl border border-red-200 bg-red-50/50 p-6 dark:border-red-500/20 dark:bg-red-500/5">
        <h2 className="text-sm font-medium text-red-700 dark:text-red-400">Danger zone</h2>
        <p className="mt-1 text-sm text-ink-soft dark:text-white/60">
          Deleting a service removes it, and its image, permanently.
        </p>
        <form action={deleteService} className="mt-4">
          <input type="hidden" name="id" value={service.id} />
          <DeleteButton
            variant="secondary"
            pendingLabel="Deleting…"
            confirmMessage={`Delete "${service.title}"? This can't be undone.`}
            className="border-red-300 text-red-700 hover:border-red-500 hover:text-red-800 dark:border-red-500/30 dark:text-red-400"
          >
            Delete service
          </DeleteButton>
        </form>
      </div>
    </div>
  );
}
