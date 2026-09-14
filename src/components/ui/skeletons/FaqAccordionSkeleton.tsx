import { Skeleton } from "@/components/ui/Skeleton";

type Props = {
  count?: number;
  showCategory?: boolean;
};

export function FaqAccordionSkeleton({
  count = 6,
  showCategory = false,
}: Props) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading FAQs">
      {showCategory ? <Skeleton className="h-6 w-40 mb-5" /> : null}
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function FaqPageSkeleton() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-site max-w-3xl space-y-12">
        <FaqAccordionSkeleton count={4} showCategory />
        <FaqAccordionSkeleton count={3} showCategory />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    </section>
  );
}
