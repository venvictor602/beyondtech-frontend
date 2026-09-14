import site from "@/data/site.json";
import { APP_ENV } from "@/config/env";

export const SEO = {
  siteName: site.brand,
  tagline: site.tagline,
  siteUrl: APP_ENV.SITE_URL.replace(/\/+$/, ""),
  defaultTitle: "Beyond Tech — Custom Software & Digital Solutions in Nigeria",
  defaultDescription:
    "Beyond Tech designs, builds and deploys custom software, attendance systems, child safety technology, church platforms, business automation and cloud infrastructure for organizations in Port Harcourt and across Nigeria.",
  twitterHandle: APP_ENV.TWITTER_HANDLE,
  locale: "en_NG",
  localeAlternate: "en",
  language: "en-NG",
  email: site.contact.email,
  phone: site.contact.phone,
  phoneE164: site.contact.phone.replace(/\s/g, ""),
  geo: {
    locality: "Port Harcourt",
    region: "Rivers State",
    regionCode: "NG-RI",
    country: "NG",
    countryName: "Nigeria",
    latitude: 4.8156,
    longitude: 7.0498,
    placename: "Port Harcourt, Rivers State, Nigeria",
  },
  googleVerification: APP_ENV.GOOGLE_SITE_VERIFICATION,
  defaultKeywords: [
    "Beyond Tech",
    "Beyond Tech Nigeria",
    "beyondtechng",
    "software company Port Harcourt",
    "software development Nigeria",
    "custom software development",
    "business automation Nigeria",
    "attendance management system Nigeria",
    "biometric attendance system",
    "workforce monitoring software",
    "child safety technology Nigeria",
    "church management software Nigeria",
    "office digital systems",
    "API development Nigeria",
    "cloud infrastructure Nigeria",
    "digital solutions Rivers State",
  ] as string[],
};

export const DEFAULT_OG_IMAGE = `${SEO.siteUrl}/opengraph-image`;
export const ORGANIZATION_ID = `${SEO.siteUrl}/#organization`;
export const WEBSITE_ID = `${SEO.siteUrl}/#website`;
