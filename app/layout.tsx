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
  title: "Corpassion Events | Premier Corporate Training & Masterclasses",
  description:
    "Elevate your team with world-class corporate training, leadership masterclasses, and transformative events. Corpassion Events delivers bespoke programs that drive measurable business results.",
  keywords: [
    "corporate training",
    "masterclasses",
    "leadership development",
    "team building",
    "corporate events",
    "professional development",
  ],
  openGraph: {
    title: "Corpassion Events | Premier Corporate Training & Masterclasses",
    description:
      "Elevate your team with world-class corporate training, leadership masterclasses, and transformative events.",
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
