import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageProse } from "@/components/content/PageProse";
import { CtaSection } from "@/components/home/CtaSection";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "About us",
  description:
    "About Beyond Tech — software development and digital solutions for schools, businesses, churches and organizations.",
  path: "/about",
  keywords: [
    "about Beyond Tech",
    "Beyond Tech Nigeria",
    "software development company Nigeria",
    "digital solutions Port Harcourt",
  ],
});

export default function AboutPage() {
  const { aboutLead, aboutParagraphs } = SITE.pages;

  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="Technology with a purpose"
        description={aboutLead}
      />
      <section className="py-14 sm:py-18">
        <div className="container-site grid lg:grid-cols-2 gap-12 items-start">
          <PageProse paragraphs={aboutParagraphs} maxWidth="none" />
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg lg:sticky lg:top-28">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
              alt="Beyond Tech team collaborating on a digital solution"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-y border-slate-200/80">
        <div className="container-site">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-slate-900 m-0 mb-4">
            Why Beyond Tech?
          </h2>
          <p className="text-[var(--text-muted)] m-0 mb-8 max-w-3xl leading-relaxed">
            We design solutions around your actual processes — practical systems
            that solve real operational problems, built to scale and protected
            with responsible data handling.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SITE.values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-slate-200/90 p-6 bg-[var(--bg-page)]"
              >
                <h3 className="font-semibold text-slate-900 m-0">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-600 m-0 mt-2 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowWeWorkSection />
      <CtaSection />
    </>
  );
}
