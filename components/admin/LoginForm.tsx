"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { login, type LoginState } from "@/app/admin/login/actions";

const inputClass =
  "w-full rounded-xl border border-ink/12 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-brand dark:border-white/15 dark:bg-surface-dark-muted dark:text-white dark:placeholder:text-white/30 dark:focus:border-signal";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="username" className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
