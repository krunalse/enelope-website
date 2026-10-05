import Image from "@/components/ui/Image";
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
        { href: "/contact", label: dict.contactLink },
      ],
    },
    {
      heading: dict.solutionsHeading,
      links: [
        { href: "/industries", label: dict.industriesLink },
        { href: "/use-cases", label: dict.useCasesLink },
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
    <footer className="relative border-t border-footer-line bg-footer-light text-ink">
      <Container className="py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink transition-colors duration-300 group-hover:bg-footer-accent-dark">
                <Image
                  src="/NexaAI-mark.png"
                  alt="NexaAI"
                  width={640}
                  height={412}
                  className="h-auto w-8"
                />
              </span>
              {/* Wordmark temporarily hidden. */}
              {/* <span className="font-display text-[1.4375rem] font-semibold text-white">
                NexaAI
              </span> */}
            </Link>
            <p className="mt-5 max-w-xs text-[1rem] leading-7 text-footer-muted">
              {dict.tagline}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-[0.75rem] uppercase tracking-eyebrow text-footer-accent">
                {col.heading}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink transition-colors duration-200 hover:text-footer-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-footer-line pt-8 text-xs text-footer-muted sm:flex-row sm:items-center">
          <p>
            {dict.copyright.replace("{year}", String(new Date().getFullYear()))}
          </p>
        </div>
      </Container>
    </footer>
  );
}
