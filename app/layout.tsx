import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { dictionary } from "@/lib/content/dictionary";
import { getServices } from "@/lib/content/data";
import { getIndustries, getUseCases } from "@/lib/content/solutions";
import "./globals.css";

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
      className={`${body.variable} ${mono.variable}`}
    >
      <body>
        <Navbar
          dict={dictionary}
          services={getServices()}
          industries={getIndustries()}
          useCases={getUseCases()}
        />
        <main>{children}</main>
        <Footer dict={dictionary} />
      </body>
    </html>
  );
}
