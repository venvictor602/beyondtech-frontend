import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesListView } from "@/components/services/ServicesListView";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbJsonLd,
  servicesItemListJsonLd,
} from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Software services in Nigeria",
  description:
    "Custom software, smart attendance, child safety, church and office platforms, business automation, APIs and cloud infrastructure from Beyond Tech in Port Harcourt.",
  path: "/services",
  keywords: [
    "software services Nigeria",
    "custom software Port Harcourt",
    "attendance management system",
    "church management software Nigeria",
    "child safety technology",
    "business automation Nigeria",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services" }]),
          servicesItemListJsonLd(),
        ]}
      />
      <PageHeader
        eyebrow="Capabilities"
        title="Our services"
        description={SITE.pages.servicesLead}
      />
      <ServicesListView />
      <CtaSection />
    </>
  );
}
