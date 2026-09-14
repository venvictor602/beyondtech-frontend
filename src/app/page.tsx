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
import { SITE } from "@/lib/content";
import { organizationJsonLd } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: SITE.brand,
  absoluteTitle: `${SITE.brand} — ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
  keywords: [
    "Beyond Tech",
    "Beyond Tech Nigeria",
    "custom software development",
    "business automation",
    "attendance management",
    "child safety technology",
    "church management software",
    "office digital systems",
    "software development Port Harcourt",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd()]} />
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
