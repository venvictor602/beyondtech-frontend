import { Skeleton } from "@/components/ui/Skeleton";

type Props = { reversed?: boolean };

export function ShowcaseRowSkeleton({ reversed = false }: Props) {
  return (
    <article
      className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center py-12 sm:py-16 border-b border-[var(--border-subtle)] last:border-b-0"
      aria-hidden
    >
      <div
        className={`flex gap-5 sm:gap-6 ${reversed ? "lg:order-2" : "lg:order-1"}`}
      >
        <Skeleton className="w-px min-h-[120px] rounded-none shrink-0" />
        <div className="flex-1 space-y-4 pt-0.5">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-8 w-full max-w-md" />
          <Skeleton className="h-8 w-4/5 max-w-sm" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <Skeleton className="h-4 w-2/3 max-w-md" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className={reversed ? "lg:order-1" : "lg:order-2"}>
        <div className="surface-card p-5 sm:p-6 lg:p-7 shadow-[var(--shadow-card)] space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="h-3 w-36" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-24" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-28 rounded-md" />
              <Skeleton className="h-7 w-32 rounded-md" />
              <Skeleton className="h-7 w-24 rounded-md" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-24" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-32 rounded-md" />
              <Skeleton className="h-7 w-28 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
