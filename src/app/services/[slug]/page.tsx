import { getServices, getServiceById } from "@/lib/api/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { pageMetadata } from "@/lib/seo/metadata";
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
    description: `${service.summary} ${service.overview}`.slice(0, 160),
    path: `/services/${service.slug}`,
    keywords: [service.name, "Beyond Tech services", "custom software Nigeria"],
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
