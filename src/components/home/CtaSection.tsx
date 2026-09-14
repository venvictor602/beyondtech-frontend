"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SITE } from "@/lib/content";

export function CtaSection() {
  const { ctaEyebrow, ctaTitle, ctaBody } = SITE.home;

  return (
    <section className="py-16 sm:py-20 section-tinted">
      <div className="container-site">
        <FadeIn>
          <div className="relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-[var(--shadow-card)]">
            <div
              className="absolute top-0 left-0 w-1 h-full bg-[var(--color-brand)]"
              aria-hidden
            />
            <div
              className="absolute -right-20 -top-20 size-64 rounded-full opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(243, 135, 55, 0.22), rgba(232, 48, 112, 0.12), transparent 70%)",
              }}
              aria-hidden
            />
            <div className="max-w-xl relative pl-2">
              <p className="eyebrow m-0 mb-3">{ctaEyebrow}</p>
              <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-semibold m-0 tracking-tight text-[var(--color-brand-dark)]">
                {ctaTitle}
              </h2>
              <p className="text-[var(--text-muted)] m-0 mt-3 text-[15px] leading-relaxed">
                {ctaBody}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative w-full sm:w-auto">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto justify-center"
              >
                Start a project
                <ArrowRight className="size-4" />
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto justify-center"
              >
                Talk to our team
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
