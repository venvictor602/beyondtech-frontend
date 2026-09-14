import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/content";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PatternDecor } from "@/components/ui/PatternDecor";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  projects: Project[];
  currentSlug: string;
};

export function RelatedProjects({ projects, currentSlug }: Props) {
  const related = projects.filter((p) => p.slug !== currentSlug).slice(0, 5);

  if (related.length === 0) return null;

  return (
    <section className="relative py-14 sm:py-20 section-tinted border-t border-[var(--border-subtle)] overflow-hidden">
      <PatternDecor pattern="grid-light" opacity={0.75} />
      <PatternDecor pattern="dots" opacity={0.35} />
      <PatternDecor
        pattern="diagonal"
        className="!inset-auto !left-0 !top-0 !w-full !h-20"
        opacity={0.25}
        fade="bottom"
      />
      <PatternDecor
        pattern="rings"
        className="!inset-auto !right-0 !bottom-0 !w-72 !h-72 translate-x-1/4 translate-y-1/4"
        opacity={0.35}
        fade="edges"
      />
      <div className="container-site relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="More work"
            title="Other case studies"
            description="Explore more work delivered by Beyond Tech across schools, businesses, churches and organizations."
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-deep)] no-underline hover:underline underline-offset-4 shrink-0"
          >
            All projects
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {related.map((project) => (
            <ProjectCard key={project.id} project={project} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
