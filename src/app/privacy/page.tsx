import { PageHeader } from "@/components/layout/PageHeader";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: `How ${SITE.brand} collects and uses personal data.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy policy" />
      <article className="container-site py-14 max-w-3xl prose-muted">
        <p className="text-sm text-slate-500">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-GB", { dateStyle: "long" })}
        </p>
        <p>
          {SITE.brand} respects your privacy. This policy describes how we
          handle information submitted through our website and during business
          engagements.
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 mt-8">
          Information we collect
        </h2>
        <p>
          Contact forms, career applications, and project enquiries may include
          name, email, phone, company, and message content.
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 mt-8">
          How we use it
        </h2>
        <p>
          We use this information to respond to enquiries, deliver services, and
          improve our website. We do not sell personal data to third parties.
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 mt-8">
          Contact
        </h2>
        <p>
          Questions:{" "}
          <a
            href={`mailto:${SITE.contact.email}`}
            className="text-[var(--color-brand)] font-semibold"
          >
            {SITE.contact.email}
          </a>
        </p>
      </article>
    </>
  );
}
