"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { Button } from "@/components/ui/Button";
import {
  DeliverableGrid,
  DetailSection,
  NumberedSteps,
  ProseBlock,
} from "@/components/content/DetailSections";
import { useServiceQuery } from "@/hooks/api/use-services-query";
import { ServiceDetailSkeleton } from "@/components/ui/skeletons";

type Props = { slug: string };

export function ServiceDetailView({ slug }: Props) {
  const { data: service, isPending } = useServiceQuery(slug);

  if (!isPending && !service) notFound();
  if (isPending || !service) return <ServiceDetailSkeleton />;

  return (
    <>
      <section className="section-dark relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 pattern-grid pointer-events-none"
          aria-hidden
        />
        <div className="container-site relative py-12 sm:py-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted-on-dark)] hover:text-[var(--color-brand-on-dark)] no-underline mb-8"
          >
            <ArrowLeft className="size-4" />
            All services
          </Link>
          <span className="inline-flex size-12 items-center justify-center rounded-lg bg-white/10 text-[var(--color-brand-on-dark)] mb-5 border border-white/10">
            <ServiceIcon name={service.icon} className="size-7" />
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold m-0 max-w-3xl text-white">
            {service.name}
          </h1>
          <p className="text-[var(--text-muted-on-dark)] m-0 mt-4 max-w-2xl text-base sm:text-lg leading-relaxed">
            {service.summary}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)]">
        <div className="container-site max-w-3xl">
          <DetailSection title="Overview">
            <ProseBlock>
              <p>{service.overview}</p>
            </ProseBlock>
          </DetailSection>
        </div>
      </section>

      {service.highlights.length > 0 ? (
        <section className="py-12 sm:py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]">
          <div className="container-site max-w-3xl">
            <DetailSection title="What this includes">
              <ul className="list-none m-0 mt-2 p-0 grid sm:grid-cols-2 gap-3">
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] text-[var(--text-muted)]"
                  >
                    <Check
                      className="size-5 shrink-0 text-[var(--color-brand-deep)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </DetailSection>
          </div>
        </section>
      ) : null}

      {service.audience ? (
        <section className="py-12 sm:py-16 border-b border-[var(--border-subtle)] section-tinted">
          <div className="container-site max-w-3xl">
            <DetailSection title="Who this is for">
              <ProseBlock>
                <p>{service.audience}</p>
              </ProseBlock>
            </DetailSection>
          </div>
        </section>
      ) : null}

      {service.benefits.length > 0 ? (
        <section className="py-12 sm:py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
          <div className="container-site">
            <DetailSection title="Benefits" className="mb-8">
              {service.whatWeDeliverSubtitle ? (
                <p className="text-[15px] text-[var(--text-muted)] m-0 mb-8 max-w-2xl leading-relaxed">
                  {service.whatWeDeliverSubtitle}
                </p>
              ) : null}
            </DetailSection>
            <DeliverableGrid items={service.benefits} />
          </div>
        </section>
      ) : null}

      {service.keyFeatures.length > 0 ? (
        <section className="py-12 sm:py-16 border-b border-[var(--border-subtle)] section-tinted">
          <div className="container-site max-w-3xl">
            <DetailSection title="How we work">
              {service.howWeWorkSubtitle ? (
                <p className="text-[15px] text-[var(--text-muted)] m-0 mb-8 leading-relaxed">
                  {service.howWeWorkSubtitle}
                </p>
              ) : null}
              <NumberedSteps steps={service.keyFeatures} />
            </DetailSection>
          </div>
        </section>
      ) : null}

      <section className="py-12 sm:py-16 bg-[var(--bg-page)]">
        <div
          className={`container-site grid gap-12 lg:gap-16 items-start ${
            service.image ? "lg:grid-cols-2" : "max-w-3xl"
          }`}
        >
          {service.image ? (
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-[var(--shadow-card)] lg:sticky lg:top-24">
              <Image
                src={service.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          ) : null}
          <div className="surface-card p-7 sm:p-8">
            <DetailSection title="At a glance">
              <ul className="list-none m-0 p-0 space-y-3">
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] text-[var(--text-muted)]"
                  >
                    <Check
                      className="size-5 shrink-0 text-[var(--color-brand-deep)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </DetailSection>
            {service.atAGlanceText ? (
              <p className="text-[15px] text-[var(--text-muted)] m-0 mt-8 leading-relaxed">
                {service.atAGlanceText}
              </p>
            ) : null}
            <div className="flex flex-col min-[400px]:flex-row flex-wrap gap-3 mt-8 [&_a]:w-full min-[400px]:[&_a]:w-auto min-[400px]:[&_a]:justify-center">
              <Button
                href={`/contact?service=${encodeURIComponent(service.slug)}`}
                variant="primary"
                size="lg"
              >
                Discuss this service
              </Button>
              <Button href="/projects" variant="outline" size="lg">
                See related work
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
