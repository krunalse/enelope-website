"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Service } from "@/types";
import type { Dictionary } from "@/lib/content/dictionary";

const inputClass =
  "w-full rounded-xl border border-ink/12 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-brand dark:border-white/15 dark:bg-surface-dark-muted dark:text-white dark:placeholder:text-white/30 dark:focus:border-signal";

type Status = "idle" | "success";

interface ContactFormProps {
  services: Service[];
  dict: Dictionary["contactForm"];
}

const CONTACT_EMAIL = "hello@enelope.ch";

function buildMailto(payload: Record<string, FormDataEntryValue>) {
  const name = String(payload.name ?? "");
  const email = String(payload.email ?? "");
  const company = String(payload.company ?? "");
  const phone = String(payload.phone ?? "");
  const service = String(payload.service ?? "");
  const message = String(payload.message ?? "");

  const subject = `New inquiry from ${name}${company ? ` (${company})` : ""}`;
  const detailLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company && `Company: ${company}`,
    phone && `Phone: ${phone}`,
    service && `Service: ${service}`,
  ].filter((line): line is string => Boolean(line));
  const body = [...detailLines, "", message].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({ services, dict }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    window.location.href = buildMailto(payload);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center dark:border-signal/20 dark:bg-signal/5">
        <p className="font-display text-lg font-medium text-ink dark:text-white">
          {dict.successTitle}
        </p>
        <p className="mt-2 text-sm text-ink-soft dark:text-white/60">
          {dict.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
            {dict.nameLabel}
          </label>
          <input id="name" name="name" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
            {dict.emailLabel}
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
            {dict.companyLabel}
          </label>
          <input id="company" name="company" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
            {dict.phoneLabel}
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
          {dict.serviceLabel}
        </label>
        <select id="service" name="service" className={inputClass} defaultValue="">
          <option value="" disabled>
            {dict.servicePlaceholder}
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value={dict.serviceNotSure}>{dict.serviceNotSure}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
          {dict.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        {dict.submit}
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
