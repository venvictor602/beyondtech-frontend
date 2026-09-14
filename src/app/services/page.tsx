import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesListView } from "@/components/services/ServicesListView";
import { CtaSection } from "@/components/home/CtaSection";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description: SITE.pages.servicesLead,
  path: "/services",
  keywords: [
    "Beyond Tech services",
    "custom software development",
    "attendance management system",
    "child safety technology",
    "church management software",
    "business automation Nigeria",
  ],
});

export default function ServicesPage() {
  return (
    <>
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
