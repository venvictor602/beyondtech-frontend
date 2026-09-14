"use client";

import { useQuery } from "@tanstack/react-query";
import { getServices, getServiceById } from "@/lib/api/services";
import { serviceKeys } from "@/lib/api/query-keys";
import { SERVICES } from "@/lib/content";

export function useServicesQuery() {
  return useQuery({
    queryKey: serviceKeys.list(),
    queryFn: getServices,
    initialData: SERVICES,
    staleTime: Infinity,
  });
}

export function useServiceQuery(slug: string) {
  const initialData = SERVICES.find(
    (service) => service.slug === slug || service.id === slug,
  );

  return useQuery({
    queryKey: serviceKeys.detail(slug),
    queryFn: () => getServiceById(slug),
    enabled: Boolean(slug),
    initialData,
    staleTime: Infinity,
  });
}
