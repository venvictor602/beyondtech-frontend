"use client";

import { useQuery } from "@tanstack/react-query";
import { getCareers, getCareerById } from "@/lib/api/careers";
import { careerKeys } from "@/lib/api/query-keys";

export function useCareersQuery() {
  return useQuery({
    queryKey: careerKeys.list(),
    queryFn: getCareers,
  });
}

export function useCareerQuery(slug: string) {
  return useQuery({
    queryKey: careerKeys.detail(slug),
    queryFn: () => getCareerById(slug),
    enabled: Boolean(slug),
  });
}
