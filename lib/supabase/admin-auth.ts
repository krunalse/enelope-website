import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/admin-emails";

// proxy.ts already redirects unauthenticated /admin traffic, but Proxy is
// an optimistic check only — every admin page and server action must call
// this too. Uses getUser() (validates the JWT against Supabase) rather than
// getSession() (reads the cookie only).
export async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login");
  }

  return user;
}
