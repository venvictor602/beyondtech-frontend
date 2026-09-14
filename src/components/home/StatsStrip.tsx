"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/content";

type ParsedStat = {
  target: number;
  suffix: string;
  isCounter: boolean;
  staticValue?: string;
};

function parseStatValue(value: string): ParsedStat {
  const slashMatch = value.match(/^(\d+)(\/\d+)(\+?)$/);
  if (slashMatch) {
    return {
      target: Number(slashMatch[1]),
      suffix: slashMatch[2] + (slashMatch[3] ?? ""),
      isCounter: true,
    };
  }

  const plusMatch = value.match(/^(\d+)(\+?)$/);
  if (plusMatch) {
    return {
      target: Number(plusMatch[1]),
      suffix: plusMatch[2] ?? "",
      isCounter: true,
    };
  }

  return { target: 0, suffix: "", isCounter: false, staticValue: value };
}

function StatCounter({
  value,
  label,
  start,
}: {
  value: string;
  label: string;
  start: boolean;
}) {
  const parsed = parseStatValue(value);
  const staticDisplay = parsed.staticValue ?? value;
  const count = useMotionValue(0);
  const counterDisplay = useTransform(
    count,
    (latest) => `${Math.round(latest)}${parsed.suffix}`,
  );

  useEffect(() => {
    if (!start || !parsed.isCounter) return;

    count.set(0);
    const controls = animate(count, parsed.target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [start, parsed.isCounter, parsed.target, count]);

  const valueClassName =
    "font-[family-name:var(--font-display)] text-2xl sm:text-[1.75rem] md:text-[2.15rem] lg:text-[2.5rem] font-semibold text-[var(--color-brand-on-dark)] m-0 tabular-nums tracking-tight whitespace-nowrap";

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-4 sm:py-2 h-full">
      {parsed.isCounter ? (
        <motion.p className={valueClassName}>{counterDisplay}</motion.p>
      ) : (
        <p className={valueClassName}>{staticDisplay}</p>
      )}
      <p className="text-xs sm:text-sm text-[var(--text-muted-on-dark)] m-0 mt-2 max-w-[9rem] sm:max-w-[11rem] leading-snug">
        {label}
      </p>
    </div>
  );
}

export function StatsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="section-dark relative border-y border-white/10"
      aria-label="Company statistics"
    >
      <div
        className="absolute inset-0 pattern-grid opacity-50 pointer-events-none"
        aria-hidden
      />
      <div className="container-site relative py-10 sm:py-16">
        <ul className="list-none m-0 p-0 grid grid-cols-2 sm:grid-cols-4 gap-0 max-w-4xl mx-auto divide-y divide-white/10 sm:divide-y-0 sm:divide-x sm:divide-white/10">
          {SITE.stats.map((stat) => (
            <li key={stat.label} className="min-w-0">
              <StatCounter
                value={stat.value}
                label={stat.label}
                start={inView}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
