"use client";

import Link from "next/link";
import { PageProse } from "@/components/content/PageProse";
import { SITE } from "@/lib/content";
import { CareersListSkeleton } from "@/components/ui/skeletons";
import { useCareersQuery } from "@/hooks/api/use-careers-query";

export function CareersListView() {
  const { data: careers = [], isPending } = useCareersQuery();

  return (
    <section className="py-14 sm:py-18">
      <div className="container-site space-y-8 max-w-3xl">
        <PageProse paragraphs={SITE.pages.careersParagraphs} maxWidth="none" />
        {isPending ? (
          <CareersListSkeleton />
        ) : (
          <div className="space-y-4">
            {careers.map((role) => (
              <Link
                key={role.id}
                href={`/careers/${role.slug}`}
                className="block rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow no-underline"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] font-bold text-slate-900 m-0 text-lg">
                      {role.title}
                    </h2>
                    <p className="text-sm text-slate-500 m-0 mt-1">
                      {role.location}
                      {role.department
                        ? ` · ${role.department}`
                        : role.type
                          ? ` · ${role.type}`
                          : ""}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-brand)]">
                    View role →
                  </span>
                </div>
                <p className="text-sm text-slate-600 m-0 mt-3 leading-relaxed">
                  {role.summary}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <p className="container-site text-sm text-slate-500 mt-10 max-w-3xl">
        Don&apos;t see a fit? Email{" "}
        <a
          href={`mailto:${SITE.contact.careersEmail}`}
          className="font-semibold text-[var(--color-brand)]"
        >
          {SITE.contact.careersEmail}
        </a>{" "}
        with your CV and area of interest.
      </p>
    </section>
  );
}
