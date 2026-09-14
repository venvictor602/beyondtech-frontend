import { QueryClient } from "@tanstack/react-query";

export const QUERY_STALE_TIME = 5 * 60 * 1_000; // 5 minutes

/**
 * Creates a fresh QueryClient for each server-side request.
 * Do NOT cache or share this across requests.
 */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
