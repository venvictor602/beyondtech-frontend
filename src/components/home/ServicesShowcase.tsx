"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES, SITE } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { ServiceIcon } from "@/components/services/ServiceIcon";

const HIGHLIGHT_COUNT = 6;

export function ServicesShowcase() {
  return (
    <section className="py-16 sm:py-20 bg-[var(--bg-elevated)] border-y border-[var(--border-subtle)]">
      <div className="container-site">
        <FadeIn className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="What we do"
            title="Services built around how you work"
            description={SITE.pages.servicesLead}
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-deep)] no-underline hover:underline underline-offset-4 shrink-0"
          >
            All services
            <ArrowRight className="size-4" />
          </Link>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.id} delay={(i % 4) * 0.04}>
              <Link
                href={`/services/${service.slug}`}
                className="group h-full flex flex-col surface-card-interactive p-6 sm:p-7 no-underline"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-[var(--color-brand-muted)] text-[var(--color-brand-deep)] mb-4">
                  <ServiceIcon name={service.icon} className="size-5" />
                </span>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-brand-dark)] m-0 text-lg group-hover:text-[var(--color-brand-deep)] transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)] m-0 mt-2 leading-relaxed">
                  {service.summary}
                </p>
                <ul className="list-none m-0 mt-5 p-0 space-y-2 flex-1">
                  {service.highlights.slice(0, HIGHLIGHT_COUNT).map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[13px] text-[var(--text-muted)] leading-snug"
                    >
                      <Check
                        className="size-4 shrink-0 text-[var(--color-brand-deep)] mt-0.5"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[var(--color-brand-deep)]">
                  View service
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
