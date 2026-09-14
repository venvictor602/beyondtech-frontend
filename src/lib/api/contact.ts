import { fetchAllPages } from "@/lib/api/client";
import { SERVICES } from "@/lib/content";
import type { ApiTestimony } from "@/types/api";

export type ContactServiceOption = {
  id: number;
  name: string;
  slug: string;
};

export async function getContactServices(): Promise<ContactServiceOption[]> {
  return SERVICES.map((service) => ({
    id: Number(service.id),
    name: service.name,
    slug: service.slug,
  }));
}

export async function getTestimonies(): Promise<ApiTestimony[]> {
  try {
    return await fetchAllPages<ApiTestimony>("/contact/testimonies/");
  } catch (error) {
    console.warn("[testimonies] API unavailable.", error);
    return [];
  }
}

export function resolveContactServiceId(
  param: string | null | undefined,
  options: ContactServiceOption[],
): string {
  if (!param) return "";
  if (param === "other") return "other";
  if (/^\d+$/.test(param)) {
    return options.some((o) => String(o.id) === param) ? param : "";
  }
  const bySlug = options.find((o) => o.slug === param);
  return bySlug ? String(bySlug.id) : "";
}

export function contactServiceLabel(
  id: string,
  options: ContactServiceOption[],
): string | null {
  if (!id || id === "other") return id === "other" ? "Other" : null;
  return options.find((o) => String(o.id) === id)?.name ?? null;
}
