"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { TestimonialsSkeleton } from "@/components/ui/skeletons";
import { useTestimoniesQuery } from "@/hooks/api/use-testimonies-query";

export function TestimonialsSection() {
  const { data: items = [], isPending } = useTestimoniesQuery();

  if (!isPending && items.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 section-tinted border-y border-[var(--border-subtle)]">
      <div className="container-site">
        <FadeIn className="mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="Testimonials"
            title="What clients say"
            description="Feedback from teams we have partnered with on custom software, attendance systems, and digital operations."
            align="center"
            className="mx-auto"
          />
        </FadeIn>

        {isPending ? (
          <TestimonialsSkeleton />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {items.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.05}>
                <article className="surface-card p-6 sm:p-7 h-full flex flex-col">
                  <p className="text-[15px] text-[var(--text-muted)] m-0 leading-relaxed flex-1">
                    &ldquo;{item.message}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[var(--border-subtle)]">
                    {item.image ? (
                      <div className="relative size-11 rounded-full overflow-hidden bg-zinc-200 shrink-0">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>
                    ) : (
                      <div
                        className="size-11 rounded-full bg-[var(--color-brand-muted)] flex items-center justify-center shrink-0 font-[family-name:var(--font-display)] font-semibold text-[var(--color-brand-deep)]"
                        aria-hidden
                      >
                        {item.client_name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-brand-dark)] m-0 text-sm truncate">
                        {item.client_name}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] m-0 mt-0.5 truncate">
                        {item.designation}
                        {item.company_name ? ` · ${item.company_name}` : ""}
                      </p>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
