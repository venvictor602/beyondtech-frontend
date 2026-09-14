import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/content";

type Props = {
  project: Project;
  variant?: "default" | "featured" | "compact";
};

export function ProjectCard({ project, variant = "default" }: Props) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  if (isCompact) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col surface-card-interactive overflow-hidden no-underline h-full"
      >
        <div className="relative aspect-[4/3] bg-zinc-200 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            sizes="(max-width: 1280px) 33vw, 20vw"
          />
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[var(--color-brand-dark)]/90 text-[9px] font-bold uppercase tracking-wide text-white">
            {project.sector}
          </span>
        </div>
        <div className="p-4 flex flex-col flex-1 border-t border-[var(--border-subtle)]">
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted)]">
            {project.year}
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-brand-dark)] m-0 mt-1.5 group-hover:text-[var(--color-brand-deep)] transition-colors leading-snug line-clamp-2">
            {project.title}
          </h3>
          <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-[var(--color-brand-deep)]">
            View
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </Link>
    );
  }

  if (isFeatured) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group grid lg:grid-cols-12 gap-0 surface-card-interactive overflow-hidden no-underline"
      >
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] bg-zinc-200 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-dark)]/50 via-transparent to-transparent lg:hidden" />
        </div>
        <div className="lg:col-span-5 p-7 sm:p-9 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-[var(--border-subtle)]">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-md bg-[var(--color-brand-muted)] text-[var(--color-brand-deep)] text-[11px] font-semibold uppercase tracking-wide">
              {project.sector}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
              {project.year}
            </span>
            <span className="px-2.5 py-1 rounded-md border border-[var(--border-subtle)] text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              Featured
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[var(--color-brand-dark)] m-0 group-hover:text-[var(--color-brand-deep)] transition-colors leading-tight">
            {project.title}
          </h2>
          <p className="text-[var(--text-muted)] m-0 mt-4 text-[15px] leading-relaxed line-clamp-4">
            {project.summary}
          </p>
          <ul className="list-none m-0 mt-6 p-0 flex flex-wrap gap-2">
            {project.outcomes.slice(0, 3).map((outcome) => (
              <li
                key={outcome}
                className="rounded-md bg-[var(--bg-page)] border border-[var(--border-subtle)] px-2.5 py-1.5 text-xs text-[var(--color-brand-dark)] leading-snug max-w-full"
              >
                {outcome}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-1.5 mt-8 text-sm font-semibold text-[var(--color-brand-deep)]">
            Read case study
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col surface-card-interactive overflow-hidden no-underline h-full"
    >
      <div className="relative aspect-[16/10] bg-zinc-200 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-md bg-[var(--color-brand-dark)]/90 text-[10px] font-bold uppercase tracking-wide text-white">
            {project.sector}
          </span>
        </div>
        <span className="absolute top-4 right-4 font-[family-name:var(--font-mono)] text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
          {project.year}
        </span>
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1 border-t border-[var(--border-subtle)]">
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)] m-0 truncate">
          {project.client}
        </p>
        <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-semibold text-[var(--color-brand-dark)] m-0 mt-2 group-hover:text-[var(--color-brand-deep)] transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--text-muted)] m-0 mt-3 leading-relaxed line-clamp-3 flex-1">
          {project.summary}
        </p>
        <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[var(--color-brand-deep)]">
          Read more
          <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
