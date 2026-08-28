import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { dictionary } from "@/lib/content/dictionary";
import { getServices, getCaseStudies } from "@/lib/content/data";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.NexaAI.ch",
  ),
  title: {
    default: "Nexa AI — AI Agents, Chatbots, Cloud & Consulting",
    template: "%s | Nexa AI",
  },
  description:
    "Nexa AI designs and deploys AI agents, chatbots, and cloud infrastructure — backed by consulting that tells you where automation actually pays off.",
  openGraph: {
    title: "Nexa AI — AI Agents, Chatbots, Cloud & Consulting",
    description:
      "AI agents, chatbots, and cloud infrastructure built for teams who want automation they can trust.",
    siteName: "Nexa AI",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        <Navbar
          dict={dictionary}
          services={getServices()}
          caseStudies={getCaseStudies()}
        />
        <main>{children}</main>
        <Footer dict={dictionary} />
      </body>
    </html>
  );
}
