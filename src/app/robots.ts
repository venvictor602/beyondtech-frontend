import type { MetadataRoute } from "next";
import { SEO } from "@/lib/seo/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SEO.siteUrl}/sitemap.xml`,
    host: SEO.siteUrl,
  };
}
