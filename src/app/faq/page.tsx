import { PageHeader } from "@/components/layout/PageHeader";
import { FaqPageView } from "@/components/faq/FaqPageView";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "FAQs",
  description:
    "Frequently asked questions about Beyond Tech services, custom software, attendance systems, child safety solutions, and how we work.",
  path: "/faq",
  keywords: [
    "Beyond Tech FAQ",
    "custom software questions",
    "attendance system FAQ",
    "church software Nigeria",
  ],
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Frequently asked questions"
        description="Answers about our services, how we work, and how to start a project with Beyond Tech."
      />
      <FaqPageView />
    </>
  );
}
