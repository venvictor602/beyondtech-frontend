import { APP_ENV } from "@/config/env";
import type { ApiPaginated } from "@/types/api";

const DEFAULT_REVALIDATE = 300;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Builds the full URL for an API path.
 *  - Server:  calls groundsup.vercel.app directly (no CORS issue)
 *  - Browser: calls /api/proxy/... on the same origin (avoids CORS, visible in Network tab)
 */
export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (isBrowser()) {
    // Strip leading slash + trailing slash, proxy adds trailing slash
    const clean = normalized.replace(/^\//, "").replace(/\/$/, "");
    return `/api/proxy/${clean}`;
  }

  return `${APP_ENV.API_BASE_URL}${normalized}`;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { revalidate?: number },
): Promise<T> {
  const { revalidate = DEFAULT_REVALIDATE, ...rest } = init ?? {};
  const url = apiUrl(path);

  const response = await fetch(url, {
    ...rest,
    ...(isBrowser() ? {} : { next: { revalidate } }),
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchAllPages<T>(
  path: string,
  revalidate = DEFAULT_REVALIDATE,
): Promise<T[]> {
  const results: T[] = [];
  let nextPath: string | null = path.endsWith("/") ? path : `${path}/`;

  while (nextPath) {
    const data: ApiPaginated<T> = await apiFetch<ApiPaginated<T>>(nextPath, {
      revalidate,
    });
    results.push(...data.results);
    nextPath = data.next ? toApiPath(data.next) : null;
  }

  return results;
}

/**
 * Converts a full pagination URL from the API response to an API path.
 * Works on both server (returns /services/?page=2)
 * and browser (returns /api/proxy/services?page=2).
 */
function toApiPath(url: string): string | null {
  try {
    const parsed = new URL(url);
    const base = new URL(APP_ENV.API_BASE_URL);

    // Extract just the path relative to the API base
    const prefix = base.pathname.replace(/\/$/, "");
    const pathname = parsed.pathname.startsWith(prefix)
      ? parsed.pathname.slice(prefix.length)
      : parsed.pathname;

    // Remove leading/trailing slashes for the clean segment
    const clean = pathname.replace(/^\//, "").replace(/\/$/, "");

    if (isBrowser()) {
      return `/api/proxy/${clean}${parsed.search}`;
    }

    return `${pathname}${parsed.search}`;
  } catch {
    if (url.startsWith("/")) {
      return isBrowser() ? `/api/proxy${url}` : url;
    }
    return null;
  }
}
