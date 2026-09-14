import { PageHeader } from "@/components/layout/PageHeader";
import { FaqPageView } from "@/components/faq/FaqPageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "FAQs about custom software in Nigeria",
  description:
    "Answers about Beyond Tech services: custom software, attendance systems, child safety solutions, church platforms, and how we design, build and deploy in Nigeria.",
  path: "/faq",
  keywords: [
    "Beyond Tech FAQ",
    "custom software questions Nigeria",
    "attendance system FAQ",
    "church software Nigeria",
  ],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQs" }]),
          faqPageJsonLd(FAQS),
        ]}
      />
      <PageHeader
        eyebrow="Support"
        title="Frequently asked questions"
        description="Answers about our services, how we work, and how to start a project with Beyond Tech."
      />
      <FaqPageView />
    </>
  );
}
