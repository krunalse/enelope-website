"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-paper/85 backdrop-blur dark:border-white/10 dark:bg-surface-dark/85">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/enelope-logo.png"
            alt="Enelope"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-display text-lg font-semibold tracking-tight text-ink dark:text-white">
            Enelope
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-brand dark:text-white/70 dark:hover:text-signal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <ButtonLink href="/contact" className="!px-5 !py-2.5 text-sm">
            Start a project
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-ink dark:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-ink/8 bg-paper px-6 py-6 dark:border-white/10 dark:bg-surface-dark md:hidden"
        >
          <nav className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-ink dark:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2">
              <ThemeToggle />
              <ButtonLink href="/contact" onClick={() => setOpen(false)}>
                Start a project
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
