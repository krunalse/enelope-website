import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-20">
      <Container className="max-w-sm">
        <h1 className="font-display text-2xl font-medium text-ink dark:text-white">
          Admin login
        </h1>
        <p className="mt-2 text-sm text-ink-soft dark:text-white/60">
          Sign in to manage services and testimonials.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </Container>
    </div>
  );
}
