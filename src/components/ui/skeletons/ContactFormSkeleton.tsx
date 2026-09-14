import { Skeleton } from "@/components/ui/Skeleton";

export function ContactFormSkeleton() {
  return (
    <div
      className="space-y-5"
      aria-busy="true"
      aria-label="Loading contact form"
    >
      <Skeleton className="h-11 w-full rounded-lg" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
      <Skeleton className="h-11 w-full rounded-lg" />
      <Skeleton className="h-11 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-12 w-36 rounded-lg" />
    </div>
  );
}
