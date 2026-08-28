"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getServiceIcon } from "@/lib/utils/serviceIcons";
import type { Dictionary } from "@/lib/content/dictionary";
import type { Service, CaseStudy } from "@/types";

interface NavbarProps {
  dict: Dictionary;
  services: Service[];
  caseStudies: CaseStudy[];
}

export function Navbar({ dict: fullDict, services, caseStudies }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const dict = fullDict.nav;

  const links = [
    {
      href: "/services",
      label: dict.services,
      menu: {
        columns: 1 as const,
        viewAllHref: "/services",
        viewAllLabel: dict.viewAllServices,
        items: services.map((service) => ({
          href: `/services/${service.slug}`,
          title: service.title,
          description: service.shortDescription,
          icon: service.icon,
        })),
      },
    },
    {
      href: "/case-studies",
      label: dict.caseStudies,
      menu: {
        columns: 2 as const,
        viewAllHref: "/case-studies",
        viewAllLabel: dict.viewAllCaseStudies,
        items: caseStudies.map((caseStudy) => ({
          href: `/case-studies/${caseStudy.slug}`,
          title: caseStudy.clientName,
          description: caseStudy.industry,
          icon: null as string | null,
        })),
      },
    },
    { href: "/about", label: dict.about, menu: null },
  ];

  const socialLinks = [
    { href: "https://enelope.ch", label: "LinkedIn", Icon: Linkedin },
    { href: "https://enelope.ch", label: "X", Icon: X },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The panel is md:hidden, so resizing past the breakpoint while it is open
  // would strand the page with a transparent header and a locked scroll.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const activeLink = links.find((link) => link.href === activeMenu) ?? null;

  return (
    <>
      {/* When open the bar goes fully transparent so the single rising panel
          behind it provides the dark background — no second surface to seam with. */}
      <header
        onMouseLeave={() => setActiveMenu(null)}
        className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-out ${
          open
            ? "border-b border-transparent bg-transparent"
            : scrolled || activeMenu
              ? "border-b border-ink/[0.07] bg-header/95 shadow-soft backdrop-blur-xl"
              : "border-b border-transparent bg-header/80 backdrop-blur-sm"
        }`}
      >
        <Container className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className={`group flex items-center gap-2.5 transition-opacity duration-200 ease-in-out ${
              open
                ? "pointer-events-none opacity-0 delay-200"
                : "opacity-100 delay-0"
            }`}
            onClick={() => setOpen(false)}
          >
            {/* The mark is a white knockout, so it needs a dark chip to read on the light bar. */}
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink transition-colors duration-300 group-hover:bg-brand">
              <Image
                src="/enelope-mark.png"
                alt="Enelope"
                width={640}
                height={412}
                className="h-auto w-8"
                priority
              />
            </span>
            {/* Wordmark temporarily hidden. */}
            {/* <span className="font-display text-[1.375rem] font-normal tracking-tight text-ink">
              Enelope
            </span> */}
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setActiveMenu(link.menu ? link.href : null)}
                onFocus={() => setActiveMenu(link.menu ? link.href : null)}
                className={`relative py-1 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  activeMenu === link.href
                    ? "text-ink after:scale-x-100"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <ButtonLink href="/contact" className="!px-5 !py-2.5 text-sm">
              {dict.startProject}
            </ButtonLink>
          </div>

          {/* Opening: hold ink until the rising panel has covered the bar (~185ms).
              Closing: snap back instantly, since the panel uncovers it in one frame. */}
          <button
            type="button"
            className={`relative z-[70] flex h-10 w-10 items-center justify-center transition-colors ease-in-out md:hidden ${
              open
                ? "text-white delay-200 duration-200"
                : "text-ink delay-0 duration-0"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? dict.closeMenu : dict.openMenu}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <Menu
              className={`absolute h-6 w-6 transition-all duration-300 ease-in-out ${
                open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <X
              className={`absolute h-6 w-6 transition-all duration-300 ease-in-out ${
                open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </button>
        </Container>

        {/* Apple-style mega menu: one full-bleed panel flush under the header,
            content swapped by activeMenu so it never floats as a separate card. */}
        <div
          className={`absolute inset-x-0 top-full border-t border-ink/[0.06] bg-header shadow-lift transition-[opacity,transform] duration-300 ease-out ${
            activeMenu
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          {activeLink?.menu && (
            <Container className="py-10">
              <ul
                className={`grid gap-x-10 gap-y-6 ${
                  activeLink.menu.columns === 2
                    ? "grid-cols-2 sm:grid-cols-4"
                    : "grid-cols-2 sm:grid-cols-3"
                }`}
              >
                {activeLink.menu.items.map((item) => {
                  const Icon = item.icon ? getServiceIcon(item.icon) : null;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="group/item flex flex-col gap-3"
                      >
                        {Icon && (
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-ink transition-colors group-hover/item:bg-ink group-hover/item:text-paper">
                            <Icon className="h-4 w-4" />
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-ink transition-colors group-hover/item:text-brand">
                            {item.title}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-ink-faint">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 border-t border-ink/[0.06] pt-5">
                <Link
                  href={activeLink.menu.viewAllHref}
                  onClick={() => setActiveMenu(null)}
                  className="text-sm font-medium text-brand transition-colors hover:text-ink"
                >
                  {activeLink.menu.viewAllLabel} →
                </Link>
              </div>
            </Container>
          )}
        </div>
      </header>

      {/* Dims the page behind the mega menu, Apple-style, and closes it on click-away. */}
      <div
        aria-hidden="true"
        onClick={() => setActiveMenu(null)}
        className={`fixed inset-0 top-20 z-40 bg-ink/20 backdrop-blur-[2px] transition-opacity duration-300 ease-out md:block ${
          activeMenu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col bg-footer transition-[transform,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open ? "visible translate-y-0" : "invisible translate-y-full"
        }`}
      >
        {/* Mirrors the header row (h-20 + Container) so the mark holds its exact
            position as the panel rises over the bar. */}
        <Container className="flex h-20 shrink-0 items-center">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`group flex items-center gap-2.5 transition-all duration-500 ease-in-out ${
              open
                ? "translate-y-0 opacity-100 delay-200"
                : "translate-y-2 opacity-0 delay-0"
            }`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-colors duration-300 group-hover:bg-brand">
              <Image
                src="/enelope-mark.png"
                alt="Enelope"
                width={640}
                height={412}
                className="h-auto w-8"
              />
            </span>
            {/* Wordmark temporarily hidden. */}
            {/* <span className="font-display text-[1.375rem] font-normal tracking-tight text-white">
              Enelope
            </span> */}
          </Link>
        </Container>

        <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-20">
          {links.map((link, i) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`font-display text-4xl font-normal text-white transition-all duration-500 ease-in-out hover:text-signal ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 80}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink
            href="/contact"
            onClick={() => setOpen(false)}
            className={`mt-4 transition-all duration-500 ease-in-out ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: open
                ? `${120 + links.length * 80}ms`
                : "0ms",
            }}
          >
            {dict.startProject}
          </ButtonLink>
        </nav>

        <div
          className={`flex items-center justify-center gap-6 pb-10 transition-all duration-500 ease-in-out ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{
            transitionDelay: open
              ? `${120 + (links.length + 1) * 80}ms`
              : "0ms",
          }}
        >
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/60 transition-colors hover:text-signal"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
