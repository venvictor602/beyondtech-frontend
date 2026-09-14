"use client";

import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "@/lib/api/faqs";
import { faqKeys } from "@/lib/api/query-keys";
import { FAQS } from "@/lib/content";

export function useFaqsQuery() {
  return useQuery({
    queryKey: faqKeys.list(),
    queryFn: getFaqs,
    initialData: FAQS,
    staleTime: Infinity,
  });
}
