import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/content";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { NewsletterSubscribe } from "@/components/layout/NewsletterSubscribe";

const FOOTER_LINKS = [
  { href: "/faq", label: "FAQs" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto section-dark relative">
      <div
        className="absolute inset-0 pattern-grid pointer-events-none opacity-60"
        aria-hidden
      />
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand)]/50 to-transparent"
        aria-hidden
      />

      <div className="container-site relative py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
        <div className="lg:col-span-2">
          <BrandLogo
            mark="full"
            variant="on-dark"
            className="h-16 sm:h-20 w-auto max-w-[min(100%,220px)]"
            href="/"
          />
          <p className="text-[var(--text-muted-on-dark)] text-sm m-0 mt-4 max-w-md leading-relaxed">
            {SITE.description}
          </p>
          <p className="text-sm text-[var(--color-brand-on-dark)]/90 m-0 mt-4 max-w-md leading-relaxed">
            {SITE.brandLine}
          </p>
          <p className="text-sm text-[var(--text-muted-on-dark)] m-0 mt-3 max-w-md leading-relaxed italic">
            Building technology that works for your organization.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted-on-dark)] m-0 mb-4">
            Explore
          </p>
          <ul className="list-none m-0 p-0 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--text-on-dark)]/80 no-underline hover:text-[var(--color-brand-on-dark)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <NewsletterSubscribe />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted-on-dark)] m-0 mb-4">
              Contact
            </p>
            <ul className="list-none m-0 p-0 space-y-3 text-sm">
              <li className="flex gap-2.5 items-start">
                <Mail
                  className="size-4 shrink-0 mt-0.5 text-[var(--color-brand)]"
                  aria-hidden
                />
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="text-[var(--text-on-dark)]/80 hover:text-[var(--color-brand-on-dark)] transition-colors"
                >
                  {SITE.contact.email}
                </a>
              </li>
              <li className="flex gap-2.5 items-start">
                <Phone
                  className="size-4 shrink-0 mt-0.5 text-[var(--color-brand)]"
                  aria-hidden
                />
                <a
                  href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`}
                  className="text-[var(--text-on-dark)]/80 hover:text-[var(--color-brand-on-dark)] transition-colors"
                >
                  {SITE.contact.phone}
                </a>
              </li>
              <li className="flex gap-2.5 items-start">
                <MapPin
                  className="size-4 shrink-0 mt-0.5 text-[var(--color-brand)]"
                  aria-hidden
                />
                <span className="text-[var(--text-on-dark)]/80">
                  {SITE.contact.addressLine}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 relative">
        <div className="container-site py-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-[var(--text-muted-on-dark)]">
          <p className="m-0">
            © {year} {SITE.brand}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--text-muted-on-dark)] hover:text-[var(--color-brand-on-dark)] no-underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
