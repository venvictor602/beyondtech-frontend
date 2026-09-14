"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props<T> = {
  items: T[];
  renderSlide: (item: T, index: number) => ReactNode;
  autoPlayMs?: number;
  className?: string;
  slideClassName?: string;
  showDots?: boolean;
  showArrows?: boolean;
  arrowsOnMobile?: boolean;
  ariaLabel?: string;
};

export function Carousel<T>({
  items,
  renderSlide,
  autoPlayMs = 7000,
  className = "",
  slideClassName = "",
  showDots = true,
  showArrows = true,
  arrowsOnMobile = false,
  ariaLabel = "Carousel",
}: Props<T>) {
  const [index, setIndex] = useState(0);
  const count = items.length;

  const atStart = index === 0;
  const atEnd = index === count - 1;

  const next = useCallback(
    () => setIndex((i) => Math.min(i + 1, count - 1)),
    [count],
  );
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  const advance = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    if (!autoPlayMs || count <= 1) return;
    const id = setInterval(advance, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, advance, count]);

  if (count === 0) return null;

  const arrowVisibility = arrowsOnMobile ? "" : "hidden sm:flex";
  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 flex size-10 sm:size-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/95 text-[var(--color-brand-dark)] transition-colors touch-target disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:border-zinc-200 disabled:text-zinc-400 enabled:hover:border-zinc-400";

  return (
    <div className={className} role="region" aria-label={ariaLabel}>
      <div className={`relative w-full overflow-hidden ${slideClassName}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0 size-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {renderSlide(items[index], index)}
          </motion.div>
        </AnimatePresence>

        {showArrows && count > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              disabled={atStart}
              className={`left-2 sm:left-3 ${arrowClass} ${arrowVisibility}`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={atEnd}
              className={`right-2 sm:right-3 ${arrowClass} ${arrowVisibility}`}
              aria-label="Next slide"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        ) : null}
      </div>

      {showDots && count > 1 ? (
        <div
          className="flex justify-center gap-2.5 mt-4 sm:mt-5 py-1"
          role="tablist"
        >
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-200 touch-target min-h-0 min-w-0 flex items-center justify-center p-2 ${
                i === index
                  ? "w-8 h-2 bg-[var(--color-brand)]"
                  : "w-2 h-2 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
