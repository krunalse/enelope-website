import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getAllServicesForAdmin, getAllTestimonialsForAdmin } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const [services, testimonials] = await Promise.all([
    getAllServicesForAdmin(),
    getAllTestimonialsForAdmin(),
  ]);
  const activeServices = services.filter((s) => s.is_active).length;
  const activeTestimonials = testimonials.filter((t) => t.is_active).length;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink dark:text-white">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-ink-soft dark:text-white/60">
        Manage the content shown on the public site.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link href="/admin/services" className="group block">
          <Card className="flex h-full flex-col justify-between">
            <div>
              <h2 className="font-display text-lg font-medium text-ink dark:text-white">
                Services
              </h2>
              <p className="mt-2 text-sm text-ink-soft dark:text-white/60">
                {activeServices} active · {services.length} total
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-sm font-medium text-brand transition-transform group-hover:translate-x-1 dark:text-signal">
              Manage services <ArrowUpRight className="h-4 w-4" />
            </div>
          </Card>
        </Link>

        <Link href="/admin/testimonials" className="group block">
          <Card className="flex h-full flex-col justify-between">
            <div>
              <h2 className="font-display text-lg font-medium text-ink dark:text-white">
                Testimonials
              </h2>
              <p className="mt-2 text-sm text-ink-soft dark:text-white/60">
                {activeTestimonials} active · {testimonials.length} total
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-sm font-medium text-brand transition-transform group-hover:translate-x-1 dark:text-signal">
              Manage testimonials <ArrowUpRight className="h-4 w-4" />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
