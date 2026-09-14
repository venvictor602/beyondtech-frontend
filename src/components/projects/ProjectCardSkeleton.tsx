import { Skeleton } from "@/components/ui/Skeleton";

type Props = {
  variant?: "default" | "featured" | "compact";
};

export function ProjectCardSkeleton({ variant = "default" }: Props) {
  if (variant === "compact") {
    return (
      <div className="surface-card overflow-hidden h-full" aria-hidden>
        <Skeleton className="aspect-[4/3] w-full rounded-none" />
        <div className="p-4 space-y-3 border-t border-[var(--border-subtle)]">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div
        className="grid lg:grid-cols-12 gap-0 surface-card overflow-hidden"
        aria-hidden
      >
        <Skeleton className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[360px] w-full rounded-none" />
        <div className="lg:col-span-5 p-7 sm:p-9 lg:p-10 space-y-4 border-t lg:border-t-0 lg:border-l border-[var(--border-subtle)]">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-12 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
          </div>
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex flex-wrap gap-2 pt-2">
            <Skeleton className="h-7 w-28 rounded-md" />
            <Skeleton className="h-7 w-32 rounded-md" />
            <Skeleton className="h-7 w-24 rounded-md" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="surface-card overflow-hidden h-full" aria-hidden>
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="p-5 sm:p-6 space-y-3 border-t border-[var(--border-subtle)]">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-20 mt-2" />
      </div>
    </div>
  );
}
