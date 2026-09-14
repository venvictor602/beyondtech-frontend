"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getContactServices,
  type ContactServiceOption,
} from "@/lib/api/contact";
import { contactServiceKeys } from "@/lib/api/query-keys";
import { SERVICES } from "@/lib/content";

const LOCAL_CONTACT_SERVICES: ContactServiceOption[] = SERVICES.map(
  (service) => ({
    id: Number(service.id),
    name: service.name,
    slug: service.slug,
  }),
);

export function useContactServicesQuery() {
  return useQuery({
    queryKey: contactServiceKeys.list(),
    queryFn: getContactServices,
    initialData: LOCAL_CONTACT_SERVICES,
    staleTime: Infinity,
  });
}
