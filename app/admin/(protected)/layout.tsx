import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { Container } from "@/components/ui/Container";
import { LogoutButton } from "@/components/admin/LogoutButton";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-surface-muted dark:bg-surface-dark-muted/40">
      <header className="border-b border-ink/8 bg-surface dark:border-white/10 dark:bg-surface-dark">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/admin"
              className="font-display text-base font-semibold text-ink dark:text-white"
            >
              Enelope Admin
            </Link>
            <nav className="hidden items-center gap-6 sm:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-ink-soft hover:text-brand dark:text-white/60 dark:hover:text-signal"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-ink-soft dark:text-white/50 sm:inline">
              {user.email}
            </span>
            <LogoutButton />
          </div>
        </Container>
      </header>
      <main className="py-10">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
