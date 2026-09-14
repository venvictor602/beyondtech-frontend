"use client";

import { PageProse } from "@/components/content/PageProse";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectsListSkeleton } from "@/components/ui/skeletons";
import { PatternDecor } from "@/components/ui/PatternDecor";
import { SITE } from "@/lib/content";
import { useProjectsQuery } from "@/hooks/api/use-projects-query";

export function ProjectsListView() {
  const { data: projects = [], isPending } = useProjectsQuery();
  const [featured, ...rest] = projects;

  return (
    <section className="relative py-12 sm:py-16 bg-[var(--bg-page)] overflow-hidden">
      <PatternDecor pattern="grid-light" opacity={0.85} />
      <PatternDecor
        pattern="dots"
        className="!left-auto !right-0 !w-[min(55vw,420px)] !h-[min(55vw,420px)] -top-8"
        opacity={0.5}
        fade="edges"
      />
      <PatternDecor
        pattern="rings"
        className="!inset-auto !left-0 !bottom-0 !w-[min(50vw,360px)] !h-[min(50vw,360px)] -translate-x-1/4 translate-y-1/4"
        opacity={0.45}
        fade="edges"
      />
      <PatternDecor
        pattern="diagonal"
        className="!inset-auto !right-0 !bottom-0 !left-auto !top-auto !w-full !h-32"
        opacity={0.35}
        fade="bottom"
      />

      {isPending ? (
        <ProjectsListSkeleton />
      ) : (
        <div className="container-site relative space-y-10">
          <div className="relative">
            <PatternDecor
              pattern="cross"
              className="!inset-auto !left-0 !top-0 !w-24 !h-24 rounded-br-3xl"
              opacity={0.6}
            />
            <PageProse paragraphs={SITE.pages.projectsParagraphs} />
          </div>

          {featured ? (
            <div className="relative">
              <PatternDecor
                pattern="diagonal"
                className="rounded-2xl"
                opacity={0.25}
              />
              <div className="relative rounded-2xl ring-1 ring-[var(--border-subtle)] ring-offset-4 ring-offset-[var(--bg-page)]">
                <ProjectCard project={featured} variant="featured" />
              </div>
            </div>
          ) : null}

          {rest.length > 0 ? (
            <div className="relative pt-2">
              <PatternDecor
                pattern="dots"
                className="!inset-auto !left-1/2 !top-0 !-translate-x-1/2 !w-[min(90%,640px)] !h-16"
                opacity={0.35}
                fade="bottom"
              />
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {rest.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          ) : null}

          {!featured && rest.length === 0 ? (
            <p className="text-[var(--text-muted)] m-0 text-center">
              No projects are available right now. Please check back soon.
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}
