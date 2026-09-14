import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Newsreader, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ToasterProvider } from "@/components/providers/ToasterProvider";
import { SiteJsonLd } from "@/lib/seo/json-ld";
import { SEO, DEFAULT_OG_IMAGE } from "@/lib/seo/constants";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0c1222" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1222" },
  ],
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: {
    template: `%s | ${SEO.siteName}`,
    default: SEO.defaultTitle,
  },
  description: SEO.defaultDescription,
  keywords: SEO.defaultKeywords,
  applicationName: SEO.siteName,
  authors: [{ name: SEO.siteName, url: SEO.siteUrl }],
  creator: SEO.siteName,
  publisher: SEO.siteName,
  category: "technology",
  referrer: "origin-when-cross-origin",
  verification: SEO.googleVerification
    ? { google: SEO.googleVerification }
    : undefined,
  appleWebApp: {
    capable: true,
    title: SEO.siteName,
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/brand/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  alternates: {
    canonical: SEO.siteUrl,
    languages: {
      "en-NG": SEO.siteUrl,
      "x-default": SEO.siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: SEO.locale,
    alternateLocale: ["en"],
    siteName: SEO.siteName,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    url: SEO.siteUrl,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SEO.defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    ...(SEO.twitterHandle ? { site: SEO.twitterHandle } : {}),
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": SEO.geo.regionCode,
    "geo.placename": SEO.geo.locality,
    "geo.position": `${SEO.geo.latitude};${SEO.geo.longitude}`,
    ICBM: `${SEO.geo.latitude}, ${SEO.geo.longitude}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-NG"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${jetbrainsMono.variable} ${dmSans.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased">
        <QueryProvider>
          <MotionProvider>
            <SiteJsonLd />
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Header />
            <main
              id="main-content"
              className="flex-1 w-full min-w-0 overflow-x-clip pt-[var(--nav-height)]"
            >
              {children}
            </main>
            <Footer />
            <ToasterProvider />
          </MotionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
