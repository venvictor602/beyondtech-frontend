import type { MetadataRoute } from "next";
import { SEO } from "@/lib/seo/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO.siteName,
    short_name: SEO.siteName,
    description: SEO.defaultDescription,
    id: SEO.siteUrl,
    start_url: SEO.siteUrl,
    display: "standalone",
    background_color: "#f3f2ee",
    theme_color: "#0c1222",
    lang: "en-NG",
    orientation: "portrait-primary",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/brand/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/brand/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
