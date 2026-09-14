import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SEO } from "./constants";

type PageMetadataOptions = {
  title: string;
  absoluteTitle?: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string | null;
  keywords?: string[];
  ogType?: "website" | "article";
};

export function absoluteUrl(path = ""): string {
  if (!path) return SEO.siteUrl;
  if (path.startsWith("http")) return path;
  return `${SEO.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function clipMeta(text: string, max = 160): string {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  const sliced = compact.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");
  return sliced.slice(0, lastSpace > 80 ? lastSpace : max).trim();
}

function resolveOgImage(
  ogImage: string | null | undefined,
): string | undefined {
  if (!ogImage) return undefined;
  return ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);
}

export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  noIndex = false,
  ogImage = DEFAULT_OG_IMAGE,
  keywords,
  ogType = "website",
}: PageMetadataOptions): Metadata {
  const canonical = path ? absoluteUrl(path) : undefined;
  const displayTitle = absoluteTitle ?? `${title} | ${SEO.siteName}`;
  const imageUrl = resolveOgImage(ogImage);
  const metaDescription = clipMeta(description);

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description: metaDescription,
    keywords: keywords
      ? [...keywords, ...SEO.defaultKeywords]
      : [...SEO.defaultKeywords],
    applicationName: SEO.siteName,
    authors: [{ name: SEO.siteName, url: SEO.siteUrl }],
    creator: SEO.siteName,
    publisher: SEO.siteName,
    category: "technology",
    formatDetection: {
      email: true,
      address: false,
      telephone: true,
    },
    alternates: canonical
      ? {
          canonical,
          languages: {
            "en-NG": canonical,
            "x-default": canonical,
          },
        }
      : undefined,
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
    openGraph: {
      type: ogType,
      locale: SEO.locale,
      alternateLocale: [SEO.localeAlternate],
      siteName: SEO.siteName,
      title: displayTitle,
      description: metaDescription,
      url: canonical ?? SEO.siteUrl,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: displayTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      ...(SEO.twitterHandle ? { site: SEO.twitterHandle } : {}),
      title: displayTitle,
      description: metaDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
    other: {
      "geo.region": SEO.geo.regionCode,
      "geo.placename": SEO.geo.locality,
      "geo.position": `${SEO.geo.latitude};${SEO.geo.longitude}`,
      ICBM: `${SEO.geo.latitude}, ${SEO.geo.longitude}`,
    },
  };
}
