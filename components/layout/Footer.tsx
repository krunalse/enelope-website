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
    <footer className="relative bg-footer">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/30 to-transparent"
      />
      <Container className="py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <Image
                src="/NexaAI-mark.png"
                alt="NexaAI"
                width={640}
                height={412}
                className="h-auto w-10"
              />
              {/* Wordmark temporarily hidden. */}
              {/* <span className="font-display text-[1.375rem] font-normal text-white">
                NexaAI
              </span> */}
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              {dict.tagline}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-[0.6875rem] uppercase tracking-eyebrow text-white/40">
                {col.heading}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors duration-200 hover:text-signal-bright"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>
            {dict.copyright.replace("{year}", String(new Date().getFullYear()))}
          </p>
          <p className="font-mono tracking-wide">{dict.builtWith}</p>
        </div>
      </Container>
    </footer>
  );
}
