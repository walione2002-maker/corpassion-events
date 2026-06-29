import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Corpassion Events | AI Leadership Summits & Global Tech Conferences",
  description:
    "Join 500+ global leaders at the AI for Non-Technical Leaders Summit in Dubai. Gain frontier insights, curated networking, and hands-on workshops. Oct 14–16, 2026.",
  keywords: [
    "AI summit",
    "AI leadership",
    "tech conference Dubai",
    "AI for non-technical leaders",
    "enterprise AI",
    "corporate events",
    "AI conference 2026",
    "digital transformation",
    "AI governance",
  ],
  openGraph: {
    title: "Corpassion Events | AI Leadership Summits & Global Tech Conferences",
    description:
      "Join 500+ global leaders at the AI for Non-Technical Leaders Summit in Dubai. Oct 14–16, 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#0a0a0a] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
