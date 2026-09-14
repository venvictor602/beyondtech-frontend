import { SITE } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export function HowWeWorkSection() {
  return (
    <section className="py-16 sm:py-20 bg-[var(--bg-elevated)] border-y border-[var(--border-subtle)]">
      <div className="container-site">
        <FadeIn>
          <SectionHeading
            eyebrow="How we work"
            title="From challenge to working solution"
            description="A clear path from understanding your organization to a system you can run, support and improve."
            className="max-w-3xl mb-10 sm:mb-12"
          />
        </FadeIn>
        <ol className="list-none m-0 p-0 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {SITE.process.map((item, index) => (
            <FadeIn key={item.step} delay={index * 0.04}>
              <li className="h-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-5 sm:p-6">
                <p className="font-[family-name:var(--font-mono)] text-sm font-semibold text-[var(--color-brand-deep)] m-0 mb-3 tabular-nums">
                  {item.step}
                </p>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-brand-dark)] m-0 text-base">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] m-0 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
