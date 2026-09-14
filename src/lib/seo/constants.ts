import site from "@/data/site.json";
import { APP_ENV } from "@/config/env";

export const SEO = {
  siteName: site.brand,
  tagline: site.tagline,
  siteUrl: APP_ENV.SITE_URL.replace(/\/+$/, ""),
  defaultTitle: `${site.brand} — ${site.tagline}`,
  defaultDescription: site.description,
  twitterHandle: APP_ENV.TWITTER_HANDLE,
  locale: "en_NG",
  email: site.contact.email,
  phone: site.contact.phone,
  defaultKeywords: [
    "Beyond Tech",
    "Beyond Tech Nigeria",
    "custom software development",
    "business automation",
    "digital solutions Nigeria",
    "attendance management system",
    "workforce monitoring",
    "child safety technology",
    "church management software",
    "office digital systems",
    "API development Nigeria",
    "cloud infrastructure",
    "Port Harcourt software company",
  ] as string[],
};

export const DEFAULT_OG_IMAGE = `${SEO.siteUrl}/opengraph-image`;
