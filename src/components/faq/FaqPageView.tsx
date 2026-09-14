"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FaqPageSkeleton } from "@/components/ui/skeletons";
import { useFaqsQuery } from "@/hooks/api/use-faqs-query";

export function FaqPageView() {
  const { data: faqs = [], isPending } = useFaqsQuery();

  if (isPending) {
    return <FaqPageSkeleton />;
  }

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  return (
    <section className="py-12 sm:py-16">
      <div className="container-site max-w-3xl space-y-12">
        {categories.map((category) => {
          const items = faqs.filter((faq) => faq.category === category);
          return (
            <div key={category}>
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-brand-dark)] m-0 mb-5 flex items-center gap-3">
                <span
                  className="w-1 h-5 rounded-full bg-[var(--color-brand)] shrink-0"
                  aria-hidden
                />
                {category}
              </h2>
              <FaqAccordion items={items} allowMultiple />
            </div>
          );
        })}

        <div className="surface-card p-6 sm:p-8 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-brand-dark)] m-0">
            Still have questions?
          </h2>
          <p className="text-[var(--text-muted)] m-0 mt-2 text-sm sm:text-[15px] leading-relaxed">
            Tell us about the process you want to improve. We will respond with
            a clear next step — usually within one business day.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[var(--color-brand-deep)] no-underline hover:underline underline-offset-4"
          >
            Contact our team
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
