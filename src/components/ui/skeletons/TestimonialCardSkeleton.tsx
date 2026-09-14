import { Skeleton } from "@/components/ui/Skeleton";

export function TestimonialCardSkeleton() {
  return (
    <div className="surface-card p-6 sm:p-7 h-full space-y-6" aria-hidden>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex items-center gap-3 pt-5 border-t border-[var(--border-subtle)]">
        <Skeleton className="size-11 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSkeleton() {
  return (
    <div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      aria-busy="true"
      aria-label="Loading testimonials"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <TestimonialCardSkeleton key={i} />
      ))}
    </div>
  );
}
