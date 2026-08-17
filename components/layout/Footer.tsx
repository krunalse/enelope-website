import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const columns = [
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { href: "/services/ai-agents", label: "AI Agents" },
      { href: "/services/chatbots", label: "Chatbots" },
      { href: "/services/cloud", label: "Cloud" },
      { href: "/services/consulting", label: "Consulting" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-paper dark:border-white/10 dark:bg-surface-dark">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/enelope-logo.png"
                alt="Enelope"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="font-display text-lg font-semibold text-ink dark:text-white">
                Enelope
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft dark:text-white/60">
              AI Agents · Chatbots · Cloud · Consulting — built for teams who
              want automation they can actually trust.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-xs uppercase tracking-widest text-ink-soft dark:text-white/40">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-brand dark:text-white/70 dark:hover:text-signal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ink/8 pt-8 text-xs text-ink-soft dark:border-white/10 dark:text-white/40 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Enelope. All rights reserved.</p>
          <p className="font-mono">Built with Next.js &amp; Supabase</p>
        </div>
      </Container>
    </footer>
  );
}
