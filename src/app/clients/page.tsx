import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageProse } from "@/components/content/PageProse";
import { CtaSection } from "@/components/home/CtaSection";
import { CLIENTS, SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Clients and organisations we serve",
  description:
    "Schools, churches, offices and enterprises that work with Beyond Tech on custom software, attendance systems, child safety and digital operations in Nigeria.",
  path: "/clients",
  keywords: [
    "Beyond Tech clients",
    "software clients Nigeria",
    "church software partner",
    "attendance systems Nigeria",
  ],
});

export default function ClientsPage() {
  const { clientsLead, clientsParagraphs } = SITE.pages;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Clients" },
        ])}
      />
      <PageHeader
        eyebrow="Partnerships"
        title="Clients & sectors"
        description={clientsLead}
      />
      <section className="py-12 sm:py-16">
        <div className="container-site space-y-12">
          <PageProse paragraphs={clientsParagraphs} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENTS.map((client) => (
              <article
                key={client.id}
                className="rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm"
              >
                {client.logo ? (
                  <div className="relative h-20 sm:h-24 w-full max-w-[260px] mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      fill
                      className="object-contain object-left"
                      sizes="260px"
                    />
                  </div>
                ) : null}
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-deep)] m-0">
                  {client.sector}
                </p>
                <h2 className="font-[family-name:var(--font-display)] font-bold text-lg text-slate-900 m-0 mt-2">
                  {client.name}
                </h2>
                <p className="text-sm text-slate-600 m-0 mt-3 leading-relaxed">
                  {client.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
