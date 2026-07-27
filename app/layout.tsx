import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import PageTransition from "@/components/PageTransition";
import GlobalBackground from "@/components/GlobalBackground";
import { siteConfig } from "@/config/site";

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Corpassion Events | Transformative Tech Summits for Global Leaders",
    template: "%s | Corpassion Events",
  },
  description:
    "Empowering global leaders through transformative tech summits and innovation conferences. Connect with decision-makers worldwide.",
  keywords: [
    "AI summit",
    "tech conference",
    "enterprise AI",
    "corporate events",
    "digital transformation",
    "innovation conference",
    "global summits",
  ],
  authors: [{ name: "Corpassion Events" }],
  creator: "Corpassion Events",
  publisher: "Corpassion Events",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Corpassion Events | Transformative Tech Summits",
    description:
      "Join global leaders and innovators at Corpassion Events. Discover our upcoming transformative tech summits worldwide.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Corpassion Events Summit",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: "Corpassion Events | Transformative Tech Summits",
    description:
      "Join global leaders and innovators at Corpassion Events. Discover our upcoming transformative tech summits worldwide.",
    images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=630&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-transparent text-slate-900 dark:text-white antialiased overflow-x-hidden transition-colors min-h-screen flex flex-col`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-black">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/icon.svg`,
              sameAs: [
                siteConfig.social.twitter,
                siteConfig.social.linkedin,
              ],
            }),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <GlobalBackground />
          <AnnouncementBanner />
          <Header />
          <PageTransition>
            <main id="main-content" className="flex-grow pt-10">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
