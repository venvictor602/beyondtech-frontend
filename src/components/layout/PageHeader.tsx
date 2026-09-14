"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  description?: string;
  eyebrow?: string;
};

export function PageHeader({ title, description, eyebrow }: Props) {
  return (
    <header className="section-dark relative overflow-hidden border-b border-white/10">
      <div
        className="absolute inset-0 pattern-grid pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--bg-page), transparent)",
        }}
        aria-hidden
      />

      <div className="container-site relative py-14 sm:py-16">
        {eyebrow ? (
          <motion.p
            className="eyebrow eyebrow-on-dark m-0 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {eyebrow}
          </motion.p>
        ) : null}
        <motion.h1
          className="font-[family-name:var(--font-display)] text-[1.75rem] min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold m-0 tracking-tight max-w-3xl text-white"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            className="text-[var(--text-muted-on-dark)] m-0 mt-5 max-w-2xl text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.4 }}
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </header>
  );
}
