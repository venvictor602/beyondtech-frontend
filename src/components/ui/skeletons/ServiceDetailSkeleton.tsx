import { Skeleton } from "@/components/ui/Skeleton";

function SectionBlock({ tinted = false }: { tinted?: boolean }) {
  return (
    <section
      className={`py-12 sm:py-16 border-b border-[var(--border-subtle)] ${tinted ? "section-tinted" : "bg-[var(--bg-elevated)]"}`}
    >
      <div className="container-site max-w-3xl space-y-5">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </section>
  );
}

export function ServiceDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading service">
      <section className="section-dark border-b border-white/10 py-12 sm:py-16">
        <div className="container-site space-y-5">
          <Skeleton className="h-4 w-28 bg-white/20" />
          <Skeleton className="size-12 rounded-lg bg-white/20" />
          <Skeleton className="h-10 w-full max-w-2xl bg-white/20" />
          <Skeleton className="h-10 w-3/4 max-w-xl bg-white/20" />
          <Skeleton className="h-5 w-full max-w-lg bg-white/15" />
        </div>
      </section>

      <SectionBlock />
      <SectionBlock tinted />

      <section className="py-12 sm:py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
        <div className="container-site space-y-6">
          <Skeleton className="h-7 w-32" />
          <div className="grid sm:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b border-[var(--border-subtle)] section-tinted">
        <div className="container-site max-w-3xl space-y-4">
          <Skeleton className="h-7 w-36" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[var(--bg-page)]">
        <div className="container-site grid lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <div className="surface-card p-7 sm:p-8 space-y-4">
            <Skeleton className="h-7 w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
            <Skeleton className="h-11 w-40 rounded-lg mt-4" />
          </div>
        </div>
      </section>
    </div>
  );
}
