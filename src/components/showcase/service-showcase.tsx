import type { Service } from "@/types/content";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import type { ShowcaseCardData } from "@/components/ui/ShowcaseRow";

export function serviceToShowcase(service: Service): ShowcaseCardData {
  const sections: ShowcaseCardData["sections"] = [];

  if (service.highlights.length > 0) {
    sections.push({
      label: "What this includes",
      items: service.highlights.slice(0, 10),
    });
  }

  if (service.benefits.length > 0) {
    sections.push({
      label: "What you get",
      items: service.benefits.map((b) => b.title),
    });
  }

  return {
    entityIcon: <ServiceIcon name={service.icon} className="size-5" />,
    entityMeta:
      service.highlights.length > 0
        ? `${service.highlights.length} capabilities`
        : `${service.benefits.length} benefits`,
    badge: "SERVICE",
    sections,
  };
}
