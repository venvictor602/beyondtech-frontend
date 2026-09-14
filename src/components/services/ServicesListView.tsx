import { ShowcaseList } from "@/components/showcase/ShowcaseList";
import { serviceToShowcase } from "@/components/showcase/service-showcase";
import { SERVICES } from "@/lib/content";

export function ServicesListView() {
  const items = SERVICES.map((service) => ({
    id: service.id,
    title: service.name,
    description: service.summary,
    href: `/services/${service.slug}`,
    linkLabel: "View full service",
    card: serviceToShowcase(service),
  }));

  return (
    <section className="py-12 sm:py-16 bg-[var(--bg-page)]">
      <div className="container-site">
        <ShowcaseList items={items} />
      </div>
    </section>
  );
}
