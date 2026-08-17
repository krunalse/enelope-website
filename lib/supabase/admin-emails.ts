// Supabase Auth has no built-in "admin" role for this project, so admin
// access is gated by an allowlist instead. Kept dependency-free (no
// next/headers) so it can be imported from proxy.ts as well as server code.
function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}
