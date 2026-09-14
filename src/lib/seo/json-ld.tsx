import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraphJsonLd } from "./structured-data";

export function SiteJsonLd() {
  return <JsonLd data={siteGraphJsonLd()} />;
}
