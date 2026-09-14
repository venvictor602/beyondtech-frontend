import { getServices, getServiceById } from "@/lib/api/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { pageMetadata, clipMeta } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/structured-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceById(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: clipMeta(
      `${service.summary} Built by Beyond Tech in Port Harcourt for organizations across Nigeria.`,
    ),
    path: `/services/${service.slug}`,
    keywords: [
      service.name,
      ...service.highlights.slice(0, 6),
      "Beyond Tech Nigeria",
      "Port Harcourt",
    ],
    ogImage: service.imageUrl,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceById(slug);

  const structuredData = service
    ? [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name },
        ]),
        serviceJsonLd(service),
      ]
    : [];

  return (
    <>
      {structuredData.length > 0 && <JsonLd data={structuredData} />}
      <ServiceDetailView slug={slug} />
    </>
  );
}
