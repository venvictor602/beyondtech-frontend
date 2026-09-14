import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Target,
  Workflow,
} from "lucide-react";
import type { Project, Service } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { PatternDecor } from "@/components/ui/PatternDecor";
import { RelatedProjects } from "@/components/projects/RelatedProjects";

function NarrativeStep({
  step,
  icon: Icon,
  title,
  children,
  variant = "light",
}: {
  step: string;
  icon: typeof Target;
  title: string;
  children: ReactNode;
  variant?: "light" | "tinted" | "dark";
}) {
  const shell =
    variant === "dark"
      ? "section-dark border-white/10"
      : variant === "tinted"
        ? "section-tinted border-[var(--border-subtle)]"
        : "bg-[var(--bg-elevated)] border-[var(--border-subtle)]";

  const stepColor =
    variant === "dark"
      ? "text-[var(--color-brand-on-dark)]"
      : "text-[var(--color-brand-deep)]";
  const titleColor =
    variant === "dark" ? "text-white" : "text-[var(--color-brand-dark)]";
  const bodyColor =
    variant === "dark" ? "text-white/80" : "text-[var(--text-muted)]";
  const iconShell =
    variant === "dark"
      ? "bg-[var(--color-brand-on-dark)]/15 text-[var(--color-brand-on-dark)] border-[var(--color-brand-on-dark)]/25"
      : "bg-[var(--color-brand-muted)] text-[var(--color-brand-deep)] border-[var(--color-brand)]/20";

  const patterns =
    variant === "dark" ? (
      <>
        <PatternDecor pattern="grid-dark" opacity={0.35} />
        <PatternDecor pattern="diagonal-dark" opacity={0.5} />
        <PatternDecor
          pattern="rings-dark"
          className="!inset-auto !right-0 !top-0 !w-64 !h-64 translate-x-1/3 -translate-y-1/4"
          opacity={0.4}
          fade="edges"
        />
      </>
    ) : variant === "tinted" ? (
      <>
        <PatternDecor pattern="grid-light" opacity={0.7} />
        <PatternDecor pattern="cross" opacity={0.45} />
        <PatternDecor
          pattern="rings"
          className="!inset-auto !left-0 !bottom-0 !w-48 !h-48 -translate-x-1/4 translate-y-1/4"
          opacity={0.35}
          fade="edges"
        />
      </>
    ) : (
      <>
        <PatternDecor pattern="dots" opacity={0.4} />
        <PatternDecor
          pattern="diagonal"
          className="!inset-auto !right-0 !top-0 !w-72 !h-72"
          opacity={0.3}
          fade="edges"
        />
      </>
    );

  return (
    <article
      className={`relative isolate border-y ${shell} py-12 sm:py-16 overflow-hidden scroll-mt-[calc(var(--nav-height)+1.5rem)]`}
    >
      {patterns}
      <div className="container-site relative z-[1]">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
            <span
              className={`font-[family-name:var(--font-mono)] text-5xl sm:text-6xl font-semibold tabular-nums leading-none ${stepColor}`}
              aria-hidden
            >
              {step}
            </span>
            <span
              className={`inline-flex size-11 items-center justify-center rounded-xl border ${iconShell} lg:mt-6`}
              aria-hidden
            >
              <Icon className="size-5" />
            </span>
            <h2
              className={`font-[family-name:var(--font-display)] text-xl sm:text-2xl font-semibold m-0 lg:mt-4 ${titleColor}`}
            >
              {title}
            </h2>
          </div>
          <div
            className={`lg:col-span-8 text-[15px] sm:text-base leading-[1.85] ${bodyColor} [&>p]:m-0`}
          >
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}

type Props = {
  project: Project;
  services: (Service | undefined)[];
  allProjects: Project[];
};

export function ProjectCaseStudy({ project, services, allProjects }: Props) {
  const leadOutcome = project.outcomes[0];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--color-brand-dark)]">
        <PatternDecor pattern="dots-dark" opacity={0.35} />
        <PatternDecor
          pattern="rings-dark"
          className="!inset-auto !right-0 !top-1/4 !w-96 !h-96 translate-x-1/3"
          opacity={0.3}
          fade="edges"
        />
        <div className="absolute inset-0 lg:grid lg:grid-cols-2">
          <div className="relative min-h-[240px] sm:min-h-[320px] lg:min-h-[min(85vh,720px)]">
            <Image
              src={project.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-brand-dark)]/20 to-[var(--color-brand-dark)]/80 lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--color-brand-dark)]"
              aria-hidden
            />
          </div>
          <div className="hidden lg:block relative bg-[var(--color-brand-dark)]">
            <PatternDecor pattern="grid-dark" opacity={0.3} />
            <PatternDecor pattern="diagonal-dark" opacity={0.45} />
          </div>
        </div>

        <div className="relative lg:absolute lg:inset-0 lg:flex lg:items-end">
          <div className="container-site relative z-[1] w-full pb-10 sm:pb-14 pt-8 sm:pt-10 lg:pt-12 lg:pb-16">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-[var(--color-brand-on-dark)] no-underline mb-8"
            >
              <ArrowLeft className="size-4" />
              All projects
            </Link>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end">
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="px-2.5 py-1 rounded-md bg-[var(--color-brand-on-dark)]/15 text-[var(--color-brand-on-dark)] text-[11px] font-semibold uppercase tracking-wide border border-[var(--color-brand-on-dark)]/25">
                    {project.sector}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-white/55">
                    {project.year}
                  </span>
                  <span className="px-2.5 py-1 rounded-md border border-white/15 text-[11px] font-medium text-white/70">
                    {project.client}
                  </span>
                </div>
                <h1 className="font-[family-name:var(--font-display)] text-[1.75rem] min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold m-0 max-w-3xl text-white leading-[1.08] tracking-tight">
                  {project.title}
                </h1>
                <p className="text-white/75 m-0 mt-5 max-w-2xl text-base sm:text-lg leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="lg:col-span-5 xl:col-span-4">
                <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-md p-5 sm:p-6 space-y-4">
                  <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-on-dark)] m-0">
                    Highlight outcome
                  </p>
                  {leadOutcome ? (
                    <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl text-white m-0 leading-snug">
                      {leadOutcome}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {services.map((service) =>
                      service ? (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="px-2.5 py-1 rounded-md border border-white/15 bg-white/5 text-[11px] font-medium text-white/90 no-underline hover:border-[var(--color-brand-on-dark)]/50 hover:text-[var(--color-brand-on-dark)] transition-colors"
                        >
                          {service.name}
                        </Link>
                      ) : null,
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative pt-8 sm:pt-10 md:pt-12 scroll-mt-[calc(var(--nav-height)+1.5rem)]">
        <div className="relative z-[1] -mt-4 sm:-mt-6 mb-0 overflow-hidden isolate">
          <PatternDecor
            pattern="cross"
            className="!h-24 !top-auto !bottom-0"
            opacity={0.2}
            fade="bottom"
          />
          <div className="container-site relative">
            <ul className="list-none m-0 p-0 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: "Client", value: project.client },
                { label: "Sector", value: project.sector },
                { label: "Year", value: project.year },
                {
                  label: "Outcomes",
                  value:
                    project.outcomesCountText ??
                    `${project.outcomes.length} delivered`,
                },
              ].map((item) => (
                <li
                  key={item.label}
                  className="relative surface-card px-4 py-4 sm:px-5 sm:py-5 border-t-2 border-t-[var(--color-brand)] overflow-hidden"
                >
                  <PatternDecor pattern="dots" opacity={0.25} />
                  <div className="relative">
                    <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] m-0">
                      {item.label}
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-sm sm:text-base font-semibold text-[var(--color-brand-dark)] m-0 mt-1.5 leading-snug">
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.context ? (
          <NarrativeStep
            step="01"
            icon={Lightbulb}
            title={project.backgroundTitle ?? "Background"}
            variant="light"
          >
            <p className="first-letter:text-4xl first-letter:font-[family-name:var(--font-display)] first-letter:font-semibold first-letter:text-[var(--color-brand-dark)] first-letter:float-left first-letter:mr-2 first-letter:mt-0.5">
              {project.context}
            </p>
          </NarrativeStep>
        ) : null}

        {project.challenge ? (
          <NarrativeStep
            step="02"
            icon={Target}
            title={project.challengeTitle ?? "The challenge"}
            variant="tinted"
          >
            <p>{project.challenge}</p>
          </NarrativeStep>
        ) : null}

        {project.approach ? (
          <NarrativeStep
            step="03"
            icon={Workflow}
            title={project.approachTitle ?? "Our approach"}
            variant="dark"
          >
            <p>{project.approach}</p>
          </NarrativeStep>
        ) : null}

        {project.extraSections?.map((section, index) => (
          <NarrativeStep
            key={`${section.title}-${index}`}
            step={String(index + 4).padStart(2, "0")}
            icon={Workflow}
            title={section.title || `Detail ${index + 1}`}
            variant={index % 2 === 0 ? "light" : "tinted"}
          >
            <p>{section.description}</p>
          </NarrativeStep>
        ))}

        <section className="relative py-12 sm:py-16 bg-[var(--bg-page)] border-b border-[var(--border-subtle)] overflow-hidden">
          <PatternDecor pattern="grid-light" opacity={0.65} />
          <PatternDecor
            pattern="rings"
            className="!inset-auto !right-0 !top-1/2 !w-80 !h-80 -translate-y-1/2 translate-x-1/3"
            opacity={0.3}
            fade="edges"
          />
          <div className="container-site relative grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 xl:col-span-4">
              <p className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-deep)] m-0 mb-3">
                Programme snapshot
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[var(--color-brand-dark)] m-0 leading-tight">
                What we shipped
              </h2>
              <p className="text-[var(--text-muted)] m-0 mt-4 text-[15px] leading-relaxed">
                Services and capabilities applied on this programme. Tap a
                service to read how Beyond Tech delivers it.
              </p>
              <Button
                href={
                  project.services[0]
                    ? `/contact?service=${encodeURIComponent(project.services[0])}`
                    : "/contact"
                }
                variant="primary"
                size="lg"
                className="mt-8 w-full sm:w-auto justify-center"
              >
                Start a similar project
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <div className="lg:col-span-7 xl:col-span-8">
              <ul className="list-none m-0 p-0 space-y-3">
                {services.map((service, i) =>
                  service ? (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group relative flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] no-underline shadow-[var(--shadow-card)] hover:border-[var(--color-brand)] transition-colors overflow-hidden"
                      >
                        <PatternDecor
                          pattern="diagonal"
                          className="opacity-0 group-hover:opacity-[0.22] transition-opacity duration-300"
                        />
                        <span className="relative font-[family-name:var(--font-mono)] text-lg font-semibold text-[var(--color-brand-deep)] tabular-nums shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="relative min-w-0 flex-1">
                          <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-brand-dark)] m-0 group-hover:text-[var(--color-brand-deep)] transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-sm text-[var(--text-muted)] m-0 mt-1.5 line-clamp-2">
                            {service.summary}
                          </p>
                        </div>
                        <ArrowRight className="size-4 text-[var(--color-brand-deep)] shrink-0 mt-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-dark relative py-14 sm:py-20 overflow-hidden">
          <PatternDecor pattern="grid-dark" opacity={0.4} />
          <PatternDecor pattern="dots-dark" opacity={0.35} />
          <PatternDecor pattern="diagonal-dark" opacity={0.35} />
          <div
            className="absolute -top-24 -right-24 size-64 rounded-full bg-[var(--color-brand-on-dark)]/10 blur-3xl pointer-events-none"
            aria-hidden
          />
          <div className="container-site relative">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div className="max-w-xl">
                <p className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-on-dark)] m-0 mb-3">
                  Results
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-white m-0">
                  Outcomes delivered on this programme
                </h2>
              </div>
              <p className="text-white/60 text-sm m-0 max-w-sm leading-relaxed">
                Measurable results agreed with the client at programme close.
              </p>
            </div>

            <ul className="list-none m-0 p-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {project.outcomes.map((outcome, i) => (
                <li
                  key={`${i}-${outcome}`}
                  className="relative rounded-xl border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.02] backdrop-blur-sm p-5 sm:p-6 overflow-hidden"
                >
                  <PatternDecor pattern="cross" opacity={0.12} />
                  <span
                    className="absolute -right-2 -top-4 font-[family-name:var(--font-mono)] text-6xl font-bold text-white/[0.06] tabular-nums select-none pointer-events-none"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative font-[family-name:var(--font-mono)] text-sm font-semibold text-[var(--color-brand-on-dark)] tabular-nums">
                    Outcome {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="relative text-white/90 m-0 mt-3 text-[15px] sm:text-base leading-relaxed">
                    {outcome}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <RelatedProjects projects={allProjects} currentSlug={project.slug} />
    </>
  );
}
