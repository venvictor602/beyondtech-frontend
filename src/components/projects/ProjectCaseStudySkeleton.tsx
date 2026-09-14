import { Skeleton } from "@/components/ui/Skeleton";
import { ProjectCardSkeleton } from "@/components/projects/ProjectCardSkeleton";

export function ProjectCaseStudySkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading project">
      <section className="relative isolate overflow-hidden bg-[var(--color-brand-dark)]">
        <div className="lg:grid lg:grid-cols-2">
          <Skeleton className="min-h-[240px] sm:min-h-[320px] lg:min-h-[min(85vh,720px)] w-full rounded-none bg-zinc-700/50" />
          <div className="p-8 sm:p-10 lg:p-14 space-y-5">
            <Skeleton className="h-4 w-32 bg-white/20" />
            <Skeleton className="h-10 w-full max-w-lg bg-white/20" />
            <Skeleton className="h-10 w-3/4 max-w-md bg-white/20" />
            <Skeleton className="h-5 w-full max-w-xl bg-white/15" />
            <Skeleton className="h-5 w-2/3 max-w-lg bg-white/15" />
            <div className="flex flex-wrap gap-3 pt-4">
              <Skeleton className="h-8 w-28 rounded-md bg-white/15" />
              <Skeleton className="h-8 w-24 rounded-md bg-white/15" />
              <Skeleton className="h-8 w-32 rounded-md bg-white/15" />
            </div>
          </div>
        </div>
      </section>

      {[1, 2, 3].map((step) => (
        <section
          key={step}
          className="py-12 sm:py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
        >
          <div className="container-site grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-4">
              <Skeleton className="h-14 w-16" />
              <Skeleton className="h-11 w-11 rounded-xl" />
              <Skeleton className="h-7 w-40" />
            </div>
            <div className="lg:col-span-8 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        </section>
      ))}

      <section className="py-14 sm:py-16 bg-[var(--bg-page)]">
        <div className="container-site">
          <Skeleton className="h-7 w-48 mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProjectCardSkeleton key={i} variant="compact" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
