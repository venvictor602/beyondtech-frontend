"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/content";
import { useServicesQuery } from "@/hooks/api/use-services-query";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { FadeIn } from "@/components/ui/FadeIn";
import { ServicePreviewCardSkeleton } from "@/components/ui/skeletons";

const SCROLL_EDGE_THRESHOLD = 2;

const navButtonClass =
  "flex size-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-zinc-600 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:border-zinc-200 disabled:text-zinc-400 enabled:hover:border-[var(--color-brand-deep)] enabled:hover:text-[var(--color-brand-deep)]";

export function ServicesPreview() {
  const { data: services = [], isPending } = useServicesQuery();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const overflow = maxScroll > SCROLL_EDGE_THRESHOLD;
    setAtStart(!overflow || el.scrollLeft <= SCROLL_EDGE_THRESHOLD);
    setAtEnd(!overflow || el.scrollLeft >= maxScroll - SCROLL_EDGE_THRESHOLD);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollEdges();
    el.addEventListener("scroll", updateScrollEdges, { passive: true });
    const observer = new ResizeObserver(updateScrollEdges);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollEdges);
      observer.disconnect();
    };
  }, [updateScrollEdges]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    if (dir === "left" && atStart) return;
    if (dir === "right" && atEnd) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 sm:py-20 overflow-hidden bg-[var(--bg-elevated)]">
      <div className="container-site">
        <FadeIn className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="What we do"
            title="Services across software and systems"
            description={SITE.pages.servicesLead}
          />
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={atStart}
                className={navButtonClass}
                aria-label="Scroll services left"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={atEnd}
                className={navButtonClass}
                aria-label="Scroll services right"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-deep)] no-underline hover:underline underline-offset-4"
            >
              All services
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </FadeIn>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-busy={isPending}
        >
          {isPending
            ? Array.from({ length: 4 }).map((_, i) => (
                <ServicePreviewCardSkeleton key={i} />
              ))
            : services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group snap-start shrink-0 w-[min(100%,300px)] sm:w-[340px] flex flex-col surface-card-interactive overflow-hidden no-underline"
                >
                  <div className="relative aspect-[5/3] bg-zinc-200 overflow-hidden">
                    <Image
                      src={service.imageUrl}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="340px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-dark)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 flex flex-col flex-1 border-t border-[var(--border-subtle)]">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[var(--color-brand-muted)] text-[var(--color-brand-deep)] mb-3">
                      <ServiceIcon name={service.icon} className="size-4" />
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-brand-dark)] m-0 text-[15px] group-hover:text-[var(--color-brand-deep)] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] m-0 mt-2 leading-relaxed line-clamp-2 flex-1">
                      {service.summary}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
