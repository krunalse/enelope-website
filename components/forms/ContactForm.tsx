"use client";

import { FormEvent, useState } from "react";
import { ChevronDown, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Service } from "@/types";
import type { Dictionary } from "@/lib/content/dictionary";

const fieldClass =
  "w-full rounded-xl border border-ink/[0.12] bg-surface px-4 py-3 text-sm text-ink shadow-sm " +
  "placeholder:text-ink-faint transition-[border-color,box-shadow] duration-200 " +
  "hover:border-ink/25 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15";

const labelClass = "mb-2 block text-sm font-medium text-ink";

type Status = "idle" | "success";

interface ContactFormProps {
  services: Service[];
  dict: Dictionary["contactForm"];
}

const CONTACT_EMAIL = "hello@NexaAI.ch";

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
      <div className="rounded-2xl border border-brand/20 bg-brand/[0.04] p-10 text-center">
        <p className="font-display text-2xl font-normal text-ink">
          {dict.successTitle}
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          {dict.successBody}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          {dict.backToForm}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-ink/[0.07] bg-surface p-7 shadow-soft sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {dict.nameLabel}
          </label>
          <input id="name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {dict.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            {dict.companyLabel}
          </label>
          <input id="company" name="company" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {dict.phoneLabel}
          </label>
          <input id="phone" name="phone" type="tel" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          {dict.serviceLabel}
        </label>
        {/* Native chevron is suppressed so the select matches the text inputs. */}
        <div className="relative">
          <select
            id="service"
            name="service"
            defaultValue=""
            className={`${fieldClass} appearance-none pr-11`}
          >
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
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {dict.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClass} resize-y py-3.5 leading-relaxed`}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        {dict.submit}
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
