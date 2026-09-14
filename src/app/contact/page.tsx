import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageProse } from "@/components/content/PageProse";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, contactPageJsonLd } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Contact Beyond Tech in Port Harcourt",
  description:
    "Start a software project with Beyond Tech. Call +234 706 509 7035 or email info@beyondtechng.com for custom software, attendance, church systems, automation and cloud.",
  path: "/contact",
  keywords: [
    "contact Beyond Tech",
    "software company Port Harcourt",
    "info@beyondtechng.com",
    "start a software project Nigeria",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact" }]),
          contactPageJsonLd(),
        ]}
      />
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        description={SITE.pages.contactLead}
      />
      <section className="py-12 sm:py-16">
        <div className="container-site grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <PageProse
              paragraphs={SITE.pages.contactParagraphs}
              maxWidth="none"
            />
            <div>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-slate-900 m-0 text-lg">
                Direct lines
              </h2>
              <ul className="list-none m-0 p-0 mt-4 space-y-4 text-sm text-slate-600">
                <li className="flex gap-3">
                  <Mail className="size-5 shrink-0 text-[var(--color-brand)]" />
                  <a
                    href={`mailto:${SITE.contact.email}`}
                    className="text-slate-800 font-medium hover:text-[var(--color-brand)]"
                  >
                    {SITE.contact.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="size-5 shrink-0 text-[var(--color-brand)]" />
                  <a
                    href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`}
                    className="text-slate-800 font-medium"
                  >
                    {SITE.contact.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="size-5 shrink-0 text-[var(--color-brand)]" />
                  <span>{SITE.contact.addressLine}</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-slate-500 m-0">{SITE.contact.hours}</p>
          </div>
          <div className="lg:col-span-7 surface-card p-5 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
