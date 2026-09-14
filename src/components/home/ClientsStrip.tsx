"use client";

import Image from "next/image";
import { CLIENTS, SITE } from "@/lib/content";
import type { Client } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HorizontalAutoScroll } from "@/components/ui/HorizontalAutoScroll";
import { FadeIn } from "@/components/ui/FadeIn";

function ClientPill({ client }: { client: Client }) {
  return (
    <div className="flex items-center gap-4 min-w-[260px] px-5 py-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
      {client.logo ? (
        <div className="relative h-12 w-20 sm:h-14 sm:w-24 shrink-0 rounded-lg overflow-hidden">
          <Image
            src={client.logo}
            alt=""
            fill
            className="object-contain object-left"
            sizes="96px"
          />
        </div>
      ) : null}
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-brand-dark)] m-0 text-sm whitespace-nowrap">
          {client.name}
        </p>
        <p className="text-xs text-[var(--text-muted)] m-0 mt-1 whitespace-nowrap">
          {client.sector}
        </p>
      </div>
    </div>
  );
}

function ClientCard({ client }: { client: Client }) {
  return (
    <article className="surface-card p-5 sm:p-6 flex flex-col">
      {client.logo ? (
        <div className="relative h-20 sm:h-24 w-full max-w-[240px] mb-5 rounded-lg overflow-hidden">
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            fill
            className="object-contain object-left"
            sizes="240px"
          />
        </div>
      ) : null}
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-deep)] m-0">
        {client.sector}
      </p>
      <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-brand-dark)] m-0 mt-2 text-base">
        {client.name}
      </h3>
      <p className="text-sm text-[var(--text-muted)] m-0 mt-3 leading-relaxed flex-1">
        {client.description}
      </p>
    </article>
  );
}

export function ClientsStrip() {
  const { clientsTitle, clientsLead } = SITE.home;

  return (
    <section
      className="py-16 sm:py-20 bg-[var(--bg-elevated)]"
      aria-label="Clients and sectors"
    >
      <div className="container-site mb-10 sm:mb-12">
        <FadeIn>
          <SectionHeading
            eyebrow="Trusted by"
            title={clientsTitle}
            description={clientsLead}
            align="center"
            className="mx-auto"
          />
        </FadeIn>
      </div>

      <div className="mb-12 sm:mb-14 container-site min-w-0">
        <HorizontalAutoScroll
          className="-mx-4 px-4 sm:mx-0 sm:px-0"
          aria-label="Organisations we work with"
        >
          {CLIENTS.map((client) => (
            <div key={client.id} role="listitem" className="shrink-0">
              <ClientPill client={client} />
            </div>
          ))}
        </HorizontalAutoScroll>
      </div>

      <div className="container-site">
        {/* <FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {CLIENTS.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        </FadeIn> */}

        {/* <FadeIn className="text-center mt-10">
          <Link
            href="/clients"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-deep)] no-underline hover:underline underline-offset-4"
          >
            More about our clients & sectors
            <ArrowRight className="size-4" />
          </Link>
        </FadeIn> */}
      </div>
    </section>
  );
}
