"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 isolate border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
      style={{ boxShadow: "var(--shadow-header)" }}
    >
      <div className="container-site flex h-[var(--nav-height)] items-center justify-between gap-4">
        <BrandLogo
          mark="full"
          className="h-10 sm:h-12 w-auto max-w-[min(100%,240px)]"
          priority
          onClick={() => setOpen(false)}
        />

        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium no-underline rounded-lg transition-colors ${
                  active
                    ? "text-[var(--color-brand-deep)] bg-[var(--color-brand-muted)]/50"
                    : "text-zinc-600 hover:text-[var(--color-brand-dark)] hover:bg-zinc-100/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center shrink-0">
          <Button href="/contact" variant="primary" size="sm">
            Start a project
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden flex touch-target items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-zinc-700"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            key="mobile-nav"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="lg:hidden absolute left-0 right-0 top-full border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-xl"
            aria-label="Mobile navigation"
          >
            <div className="container-site px-4 py-5 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-3 rounded-lg text-base font-medium text-zinc-800 no-underline hover:bg-[var(--color-brand-muted)]/40 hover:text-[var(--color-brand-deep)]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="mt-2 w-full justify-center"
                onClick={() => setOpen(false)}
              >
                Start a project
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
