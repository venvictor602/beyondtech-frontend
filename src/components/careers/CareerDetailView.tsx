"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CareerApplyForm } from "@/components/careers/CareerApplyForm";
import { Button } from "@/components/ui/Button";
import {
  BulletList,
  DetailSection,
  ProseBlock,
} from "@/components/content/DetailSections";
import { SITE } from "@/lib/content";
import { useCareerQuery } from "@/hooks/api/use-careers-query";
import { CareerDetailSkeleton } from "@/components/ui/skeletons";

type Props = { slug: string };

function isApiCareer(id: string): boolean {
  return /^\d+$/.test(id);
}

export function CareerDetailView({ slug }: Props) {
  const { data: role, isPending } = useCareerQuery(slug);

  if (!isPending && !role) notFound();
  if (isPending || !role) return <CareerDetailSkeleton />;

  return (
    <>
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-10 sm:py-12">
        <div className="container-site max-w-3xl">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--color-brand)] no-underline mb-6"
          >
            <ArrowLeft className="size-4" />
            All openings
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)] m-0">
            {role.location}
            {role.department ? ` · ${role.department}` : ` · ${role.type}`}
            {role.deadline ? ` · Apply by ${role.deadline}` : ""}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-brand-dark)] m-0 mt-2">
            {role.title}
          </h1>
          <p className="text-[var(--text-muted)] m-0 mt-4 text-[15px] leading-relaxed">
            {role.summary}
          </p>
          {role.salaryRange ? (
            <p className="text-sm text-[var(--color-brand-dark)] m-0 mt-3 font-medium">
              Salary range: {role.salaryRange}
            </p>
          ) : null}
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="container-site max-w-3xl space-y-10">
          <DetailSection title="About the role">
            <ProseBlock>
              <p>{role.about}</p>
            </ProseBlock>
          </DetailSection>

          {role.responsibilities.length > 0 ? (
            <DetailSection title="What you will do">
              <BulletList items={role.responsibilities} />
            </DetailSection>
          ) : null}

          {role.requirements.length > 0 ? (
            <DetailSection title="What we are looking for">
              <BulletList items={role.requirements} />
            </DetailSection>
          ) : null}

          {role.niceToHave && role.niceToHave.length > 0 ? (
            <DetailSection title="Benefits">
              <BulletList items={role.niceToHave} />
            </DetailSection>
          ) : null}

          <DetailSection title="Apply for this role">
            {isApiCareer(role.id) ? (
              <CareerApplyForm careerId={role.id} roleTitle={role.title} />
            ) : (
              <ProseBlock>
                <p>
                  Send your CV and a short note on relevant experience to{" "}
                  <a
                    href={`mailto:${SITE.contact.careersEmail}`}
                    className="font-medium text-[var(--color-brand)] hover:underline underline-offset-2"
                  >
                    {SITE.contact.careersEmail}
                  </a>
                  . Use the subject line{" "}
                  <strong className="text-[var(--color-brand-dark)]">
                    Application: {role.title}
                  </strong>
                  .
                </p>
              </ProseBlock>
            )}
          </DetailSection>

          {!isApiCareer(role.id) ? (
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                href={`mailto:${SITE.contact.careersEmail}?subject=Application: ${encodeURIComponent(role.title)}`}
                variant="primary"
                size="lg"
              >
                Apply by email
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Ask a question
              </Button>
            </div>
          ) : null}

          <p className="text-xs text-zinc-500 m-0 pt-4 border-t border-[var(--border-subtle)]">
            {SITE.brand} is an equal opportunity employer.
          </p>
        </div>
      </section>
    </>
  );
}
