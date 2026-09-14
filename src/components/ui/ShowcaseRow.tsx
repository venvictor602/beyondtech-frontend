"use client";

import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/ui/FadeIn";

export type ShowcaseCardSection = {
  label: string;
  items: string[];
};

export type ShowcaseCardData = {
  entityIcon?: ReactNode;
  entityMeta?: string;
  badge?: string;
  sections: ShowcaseCardSection[];
};

type Props = {
  index: number;
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
  reversed?: boolean;
  card: ShowcaseCardData;
};

function ShowcaseCard({ card }: { card: ShowcaseCardData }) {
  return (
    <div className="surface-card p-5 sm:p-6 lg:p-7 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 min-w-0">
          {card.entityIcon ? (
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-dark)] text-white">
              {card.entityIcon}
            </span>
          ) : null}
          {card.entityMeta ? (
            <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)] m-0">
              {card.entityMeta}
            </p>
          ) : null}
        </div>
        {card.badge ? (
          <span className="inline-flex items-center gap-1.5 shrink-0 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-page)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-wide text-[var(--color-brand-deep)]">
            {card.badge}
            <BarChart3 className="size-3" aria-hidden />
          </span>
        ) : null}
      </div>

      <div className="space-y-5">
        {card.sections.map((section) => (
          <div key={section.label}>
            <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)] m-0 mb-3">
              {section.label}
            </p>
            <ul className="list-none m-0 p-0 flex flex-wrap gap-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-page)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-brand-dark)] leading-tight"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShowcaseRow({
  index,
  title,
  description,
  href,
  linkLabel = "Learn more",
  reversed = false,
  card,
}: Props) {
  const indexLabel = String(index).padStart(2, "0");

  return (
    <FadeIn>
      <article className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center py-12 sm:py-16 border-b border-[var(--border-subtle)] last:border-b-0">
        <div
          className={`flex gap-5 sm:gap-6 ${reversed ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="relative shrink-0 w-px bg-[var(--color-brand-dark)]/20 self-stretch min-h-[120px]">
            <span
              className="absolute -left-[3px] top-0 size-1.5 rounded-full bg-[var(--color-brand-dark)]"
              aria-hidden
            />
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="font-[family-name:var(--font-mono)] text-sm font-semibold text-[var(--color-brand-dark)] m-0 mb-4 tabular-nums">
              {indexLabel} /
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[var(--color-brand-dark)] m-0 leading-[1.15] tracking-tight">
              {title}
            </h3>
            <p className="text-[15px] sm:text-base text-[var(--text-muted)] m-0 mt-4 leading-[1.75] max-w-lg">
              {description}
            </p>
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-[var(--color-brand-deep)] no-underline hover:underline underline-offset-4"
            >
              {linkLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className={reversed ? "lg:order-1" : "lg:order-2"}>
          <ShowcaseCard card={card} />
        </div>
      </article>
    </FadeIn>
  );
}
