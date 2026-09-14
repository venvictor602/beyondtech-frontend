import { PageHeader } from "@/components/layout/PageHeader";
import { CareersListView } from "@/components/careers/CareersListView";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Careers at Beyond Tech",
  description:
    "Join Beyond Tech in Port Harcourt. Open roles in software engineering, product design and digital systems delivery for organizations across Nigeria.",
  path: "/careers",
  keywords: [
    "Beyond Tech careers",
    "software jobs Port Harcourt",
    "engineering jobs Nigeria",
  ],
});

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers" },
        ])}
      />
      <PageHeader
        eyebrow="Join us"
        title="Careers"
        description={SITE.pages.careersLead}
      />
      <CareersListView />
    </>
  );
}
