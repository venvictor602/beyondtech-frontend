import { ShowcaseRowSkeleton } from "@/components/ui/skeletons/ShowcaseRowSkeleton";

export function ServicesListSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading services">
      {Array.from({ length: 4 }).map((_, i) => (
        <ShowcaseRowSkeleton key={i} reversed={i % 2 === 1} />
      ))}
    </div>
  );
}
