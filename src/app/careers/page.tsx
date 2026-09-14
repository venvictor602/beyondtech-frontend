import { PageHeader } from "@/components/layout/PageHeader";
import { CareersListView } from "@/components/careers/CareersListView";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Careers at Beyond Tech — open roles in software engineering, product design, and digital systems delivery.",
  path: "/careers",
  keywords: [
    "Beyond Tech careers",
    "software jobs Nigeria",
    "engineering jobs Port Harcourt",
  ],
});

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join us"
        title="Careers"
        description={SITE.pages.careersLead}
      />
      <CareersListView />
    </>
  );
}
