import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "./structured-data";

export function SiteJsonLd() {
  return <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />;
}
