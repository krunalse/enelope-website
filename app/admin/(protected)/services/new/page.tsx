import type { Metadata } from "next";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { createService } from "@/app/admin/(protected)/services/actions";

export const metadata: Metadata = {
  title: "New Service",
};

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink dark:text-white">
        New service
      </h1>
      <div className="mt-8 max-w-2xl">
        <ServiceForm action={createService} submitLabel="Create service" />
      </div>
    </div>
  );
}
