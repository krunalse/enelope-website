import { LogOut } from "lucide-react";
import { logout } from "@/app/admin/(protected)/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-brand dark:text-white/60 dark:hover:text-signal"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </form>
  );
}
