import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.enelope.ch"
  ),
  title: {
    default: "Enelope — AI Agents, Chatbots, Cloud & Consulting",
    template: "%s | Enelope",
  },
  description:
    "Enelope designs and deploys AI agents, chatbots, and cloud infrastructure — backed by consulting that tells you where automation actually pays off.",
  openGraph: {
    title: "Enelope — AI Agents, Chatbots, Cloud & Consulting",
    description:
      "AI agents, chatbots, and cloud infrastructure built for teams who want automation they can trust.",
    siteName: "Enelope",
    type: "website",
  },
};

// True root layout. Shared by both the localized public site (app/[locale])
// and the unlocalized admin panel (app/admin) — anything that must apply to
// both lives here (fonts, ThemeProvider). Navbar/Footer live one level down
// in app/[locale]/layout.tsx since admin has its own header and isn't
// translated. <html lang> can't be set per-locale here since this layout
// sits above the [locale] segment — see components/layout/HtmlLangSync.tsx.
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
