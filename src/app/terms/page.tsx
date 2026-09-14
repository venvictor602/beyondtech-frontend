import { PageHeader } from "@/components/layout/PageHeader";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Terms of use",
  description: `Terms governing use of the ${SITE.brand} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of use" />
      <article className="container-site py-14 max-w-3xl prose-muted">
        <p className="text-sm text-slate-500">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-GB", { dateStyle: "long" })}
        </p>
        <p>
          By using this website you agree to these terms. Content is provided
          for general information about {SITE.brand} services and does not
          constitute a binding offer until confirmed in writing.
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 mt-8">
          Intellectual property
        </h2>
        <p>
          Text, graphics, and case study summaries on this site are owned by or
          licensed to {SITE.brand} unless otherwise stated.
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 mt-8">
          Limitation
        </h2>
        <p>
          We strive for accuracy but do not warrant that the site is error-free
          or uninterrupted. Liability is limited to the fullest extent permitted
          by applicable law.
        </p>
      </article>
    </>
  );
}
