import { Skeleton } from "@/components/ui/Skeleton";

export function ServicePreviewCardSkeleton() {
  return (
    <div
      className="snap-start shrink-0 w-[min(100%,300px)] sm:w-[340px] flex flex-col surface-card overflow-hidden"
      aria-hidden
    >
      <Skeleton className="aspect-[5/3] w-full rounded-none" />
      <div className="p-5 space-y-3 border-t border-[var(--border-subtle)]">
        <Skeleton className="size-9 rounded-lg" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}
