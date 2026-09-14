"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { FaqAccordionSkeleton } from "@/components/ui/skeletons";
import { useFaqsQuery } from "@/hooks/api/use-faqs-query";

const HOME_FAQ_COUNT = 6;

export function FaqSection() {
  const { data: faqs = [], isPending } = useFaqsQuery();
  const previewFaqs = faqs.slice(0, HOME_FAQ_COUNT);

  return (
    <section className="py-16 sm:py-20 bg-[var(--bg-elevated)] border-y border-[var(--border-subtle)]">
      <div className="container-site">
        <FadeIn className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            description="Quick answers about how we work, what we deliver, and how to engage our team."
          />
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-deep)] no-underline hover:underline underline-offset-4 shrink-0"
          >
            View all FAQs
            <ArrowRight className="size-4" />
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          {isPending ? (
            <FaqAccordionSkeleton count={HOME_FAQ_COUNT} />
          ) : (
            <FaqAccordion items={previewFaqs} />
          )}
        </FadeIn>
      </div>
    </section>
  );
}
