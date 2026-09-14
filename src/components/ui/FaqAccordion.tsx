"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/types/content";

type Props = {
  items: Faq[];
  allowMultiple?: boolean;
  className?: string;
};

export function FaqAccordion({
  items,
  allowMultiple = false,
  className = "",
}: Props) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        return next;
      }
      if (!allowMultiple) next.clear();
      next.add(id);
      return next;
    });
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const panelId = `${baseId}-${item.id}`;

        return (
          <div
            key={item.id}
            className="surface-card overflow-hidden transition-shadow hover:shadow-[var(--shadow-card-hover)]"
          >
            <h3 className="m-0">
              <button
                type="button"
                id={`${panelId}-trigger`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left bg-transparent border-0 cursor-pointer group"
              >
                <span className="font-[family-name:var(--font-display)] text-[15px] sm:text-base font-semibold text-[var(--color-brand-dark)] group-hover:text-[var(--color-brand-deep)] transition-colors leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={`size-5 shrink-0 mt-0.5 text-[var(--color-brand-deep)] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-trigger`}
              hidden={!isOpen}
              className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1"
            >
              <p className="m-0 text-sm sm:text-[15px] text-[var(--text-muted)] leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
