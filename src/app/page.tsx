import { HeroSection } from "@/components/home/HeroSection";
import { HomeIntroSection } from "@/components/home/HomeIntroSection";
import { StatsStrip } from "@/components/home/StatsStrip";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { ClientsStrip } from "@/components/home/ClientsStrip";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQS, SERVICES } from "@/lib/content";
import { SEO } from "@/lib/seo/constants";
import {
  faqPageJsonLd,
  servicesItemListJsonLd,
} from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: SEO.siteName,
  absoluteTitle: SEO.defaultTitle,
  description: SEO.defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          servicesItemListJsonLd(SERVICES),
          faqPageJsonLd(FAQS.slice(0, 6)),
        ]}
      />
      <HeroSection />
      <StatsStrip />
      <HomeIntroSection />
      <ServicesShowcase />
      <HowWeWorkSection />
      <ClientsStrip />
      <TestimonialsSection />
      <ProjectsPreview />
      <FaqSection />
      <CtaSection />
    </>
  );
}
