import { Skeleton } from "@/components/ui/Skeleton";

export function CareerListItemSkeleton() {
  return (
    <div
      className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-4"
      aria-hidden
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4 max-w-sm" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

export function CareersListSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading careers">
      {Array.from({ length: 3 }).map((_, i) => (
        <CareerListItemSkeleton key={i} />
      ))}
    </div>
  );
}
