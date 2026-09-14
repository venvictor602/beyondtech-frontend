"use client";

import { useQuery } from "@tanstack/react-query";
import { getTestimonies } from "@/lib/api/contact";
import { testimonyKeys } from "@/lib/api/query-keys";

export function useTestimoniesQuery() {
  return useQuery({
    queryKey: testimonyKeys.list(),
    queryFn: getTestimonies,
  });
}
