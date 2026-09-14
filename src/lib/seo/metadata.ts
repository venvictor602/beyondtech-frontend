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
};

export function absoluteUrl(path = ""): string {
  if (!path) return SEO.siteUrl;
  if (path.startsWith("http")) return path;
  return `${SEO.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
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
}: PageMetadataOptions): Metadata {
  const canonical = path ? absoluteUrl(path) : undefined;
  const displayTitle = absoluteTitle ?? `${title} | ${SEO.siteName}`;
  const imageUrl = resolveOgImage(ogImage);

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords: keywords ? [...keywords] : [...SEO.defaultKeywords],
    applicationName: SEO.siteName,
    authors: [{ name: SEO.siteName, url: SEO.siteUrl }],
    creator: SEO.siteName,
    publisher: SEO.siteName,
    formatDetection: {
      email: true,
      address: false,
      telephone: true,
    },
    alternates: canonical
      ? {
          canonical,
          languages: { "en-NG": canonical },
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
      type: "website",
      locale: SEO.locale,
      siteName: SEO.siteName,
      title: displayTitle,
      description,
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
      site: SEO.twitterHandle,
      title: displayTitle,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
