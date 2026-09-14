import { SITE } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export function HomeIntroSection() {
  const { introTitle, introParagraphs } = SITE.home;

  return (
    <section className="py-16 sm:py-20 section-tinted border-y border-[var(--border-subtle)]">
      <div className="container-site">
        <FadeIn>
          <SectionHeading
            eyebrow="Beyond Tech"
            title={introTitle}
            className="max-w-3xl mb-8 sm:mb-10"
          />
        </FadeIn>
        <FadeIn delay={0.05}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl">
            {introParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="m-0 text-[15px] sm:text-base text-[var(--text-muted)] leading-[1.75]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
