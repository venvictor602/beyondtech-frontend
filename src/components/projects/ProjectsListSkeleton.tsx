import { ProjectCardSkeleton } from "@/components/projects/ProjectCardSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export function ProjectsListSkeleton() {
  return (
    <div
      className="container-site relative space-y-10"
      aria-busy="true"
      aria-label="Loading projects"
    >
      <div className="space-y-3 max-w-3xl">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="rounded-2xl ring-1 ring-[var(--border-subtle)] ring-offset-4 ring-offset-[var(--bg-page)]">
        <ProjectCardSkeleton variant="featured" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 pt-2">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </div>
  );
}
