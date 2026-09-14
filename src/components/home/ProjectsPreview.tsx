"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/content";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCardSkeleton } from "@/components/ui/skeletons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { useProjectsForDisplayQuery } from "@/hooks/api/use-projects-query";

const HOME_PROJECT_COUNT = 3;

export function ProjectsPreview() {
  const { data: projects = [], isPending } = useProjectsForDisplayQuery();
  const items = projects.slice(0, HOME_PROJECT_COUNT);

  return (
    <section className="py-16 sm:py-20 section-tinted border-y border-[var(--border-subtle)]">
      <div className="container-site">
        <FadeIn className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="Case studies"
            title="Selected projects"
            description={SITE.pages.projectsLead}
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-deep)] no-underline hover:underline underline-offset-4 shrink-0"
          >
            All projects
            <ArrowRight className="size-4" />
          </Link>
        </FadeIn>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          aria-busy={isPending}
        >
          {isPending
            ? Array.from({ length: HOME_PROJECT_COUNT }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))
            : items.map((project, i) => (
                <FadeIn key={project.id} delay={i * 0.05}>
                  <ProjectCard project={project} />
                </FadeIn>
              ))}
        </div>
      </div>
    </section>
  );
}
