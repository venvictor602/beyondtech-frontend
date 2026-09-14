"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  speed?: "slow" | "normal" | "fast";
};

const speedClass = {
  slow: "[animation-duration:55s]",
  normal: "",
  fast: "[animation-duration:28s]",
};

export function Marquee({ children, className = "", speed = "normal" }: Props) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div
        className={`gus-marquee-track flex w-max gap-4 ${speedClass[speed]}`}
      >
        <div className="flex gap-4 shrink-0">{children}</div>
        <div className="flex gap-4 shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
