import { apiFetch, fetchAllPages } from "@/lib/api/client";
import { mapApiCareerToRole } from "@/lib/api/mappers";
import type { ApiCareer } from "@/types/api";
import type { CareerRole } from "@/types/content";

export async function getCareers(): Promise<CareerRole[]> {
  try {
    const items = await fetchAllPages<ApiCareer>("/careers/careers/");
    return items.map(mapApiCareerToRole);
  } catch (error) {
    console.warn("[careers] API unavailable.", error);
    return [];
  }
}

export async function getCareerById(
  id: string,
): Promise<CareerRole | undefined> {
  try {
    const career = await apiFetch<ApiCareer>(`/careers/careers/${id}/`);
    return mapApiCareerToRole(career);
  } catch {
    const careers = await getCareers();
    return careers.find((c) => c.id === id || c.slug === id);
  }
}
