import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cookie-free client for public, unauthenticated reads (RLS: is_active = true).
// Unlike lib/supabase/server.ts, this never touches next/headers `cookies()`,
// so calling it doesn't force a route into fully dynamic rendering — public
// pages can stay statically generated / ISR'd and still show live content.
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
