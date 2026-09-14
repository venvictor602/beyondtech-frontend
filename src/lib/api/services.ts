import { SERVICES } from "@/lib/content";
import type { Service } from "@/types/content";

export async function getServices(): Promise<Service[]> {
  return SERVICES;
}

export async function getServiceById(
  slugOrId: string,
): Promise<Service | undefined> {
  return SERVICES.find(
    (service) => service.slug === slugOrId || service.id === slugOrId,
  );
}
