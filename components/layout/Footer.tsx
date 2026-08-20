import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/content/dictionary";

interface FooterProps {
  dict: Dictionary;
}

export function Footer({ dict: fullDict }: FooterProps) {
  const dict = fullDict.footer;

  const columns = [
    {
      heading: dict.companyHeading,
      links: [
        { href: "/about", label: dict.aboutLink },
        { href: "/case-studies", label: dict.caseStudiesLink },
        { href: "/contact", label: dict.contactLink },
      ],
    },
    {
      heading: dict.servicesHeading,
      links: [
        { href: "/services/ai-agents", label: dict.aiAgentsLink },
        { href: "/services/chatbots", label: dict.chatbotsLink },
        { href: "/services/cloud", label: dict.cloudLink },
        { href: "/services/consulting", label: dict.consultingLink },
      ],
    },
    {
      heading: dict.legalHeading,
      links: [
        { href: "/privacy", label: dict.privacyLink },
        { href: "/terms", label: dict.termsLink },
      ],
    },
  ];

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
              {dict.tagline}
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
          <p>{dict.copyright.replace("{year}", String(new Date().getFullYear()))}</p>
          <p className="font-mono">{dict.builtWith}</p>
        </div>
      </Container>
    </footer>
  );
}
