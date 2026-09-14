"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";

const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    label: "Custom software development",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    label: "Smart attendance & workforce",
  },
  {
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80",
    label: "Child safety & location",
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    label: "Automation, APIs & cloud",
  },
];

const CAPABILITIES = [
  "Custom software",
  "Smart attendance",
  "Child safety",
  "Church & office systems",
  "Business automation",
  "Cloud & APIs",
];

export function HeroSection() {
  return (
    <section className="section-dark relative overflow-hidden">
      <div
        className="absolute inset-0 pattern-grid pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 100% 50%, rgba(243, 135, 55, 0.22), rgba(232, 48, 112, 0.12), transparent)",
        }}
        aria-hidden
      />

      <div className="container-site relative py-12 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <motion.p
              className="eyebrow eyebrow-on-dark m-0 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {SITE.tagline}
            </motion.p>

            <motion.h1
              className="font-[family-name:var(--font-display)] text-[1.625rem] min-[400px]:text-3xl sm:text-4xl lg:text-[2.875rem] font-semibold m-0 max-w-lg leading-[1.12] tracking-tight text-white"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Technology built around{" "}
              <span className="text-[var(--color-brand-on-dark)]">
                your business
              </span>
            </motion.h1>

            <motion.p
              className="text-[var(--text-muted-on-dark)] m-0 mt-6 max-w-md text-base leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              {SITE.description}
            </motion.p>
            <motion.p
              className="text-sm text-[var(--color-brand-on-dark)]/90 m-0 mt-3 max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.16 }}
            >
              {SITE.brandLine}
            </motion.p>

            <motion.div
              className="flex flex-col min-[480px]:flex-row flex-wrap gap-3 mt-8 sm:mt-9 [&_a]:w-full min-[480px]:[&_a]:w-auto min-[480px]:[&_a]:justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Button href="/contact" variant="primary" size="lg">
                Start a project
                <ArrowRight className="size-4" />
              </Button>
              <Button
                href="/services"
                variant="outline"
                size="lg"
                className="!border-white/25 !text-white !bg-white/5 hover:!bg-white/10 hover:!border-white/40"
              >
                Explore our services
              </Button>
            </motion.div>

            <ul className="flex flex-wrap gap-2 mt-10 list-none m-0 p-0">
              {CAPABILITIES.map((item) => (
                <li
                  key={item}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-[var(--text-muted-on-dark)] border border-white/10 bg-white/5"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div className="p-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
              <Carousel
                items={HERO_SLIDES}
                ariaLabel="Featured service areas"
                arrowsOnMobile={false}
                slideClassName="rounded-lg overflow-hidden aspect-[4/3] sm:aspect-[4/3] max-h-[280px] sm:max-h-none ring-1 ring-white/20"
                renderSlide={(slide, slideIndex) => (
                  <figure className="relative block size-full min-h-full m-0 bg-zinc-800">
                    <Image
                      src={slide.src}
                      alt={slide.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={slideIndex === 0}
                    />
                    <figcaption className="absolute bottom-0 inset-x-0 px-4 py-3 bg-[var(--bg-dark)]/75 text-sm font-medium text-white backdrop-blur-sm">
                      {slide.label}
                    </figcaption>
                  </figure>
                )}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
