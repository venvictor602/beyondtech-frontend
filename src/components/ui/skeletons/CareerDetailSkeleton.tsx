import { Skeleton } from "@/components/ui/Skeleton";

export function CareerDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading career">
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-10 sm:py-12">
        <div className="container-site max-w-3xl space-y-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-56" />
          <Skeleton className="h-9 w-full max-w-lg" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="container-site max-w-3xl space-y-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-7 w-44" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
          <div className="space-y-4 pt-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-11 w-full rounded-lg" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Skeleton className="h-11 w-full rounded-lg" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
