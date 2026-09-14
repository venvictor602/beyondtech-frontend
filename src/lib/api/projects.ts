import { apiFetch, fetchAllPages } from "@/lib/api/client";
import { mapApiProjectToProject } from "@/lib/api/mappers";
import type { ApiProject } from "@/types/api";
import type { Project } from "@/types/content";

export async function getProjects(): Promise<Project[]> {
  try {
    const items = await fetchAllPages<ApiProject>("/services/projects/");
    return items.map(mapApiProjectToProject);
  } catch (error) {
    console.warn("[projects] API unavailable.", error);
    return [];
  }
}

export async function getProjectById(
  slugOrId: string,
): Promise<Project | undefined> {
  if (/^\d+$/.test(slugOrId)) {
    try {
      const project = await apiFetch<ApiProject>(
        `/services/project/${slugOrId}/`,
      );
      return mapApiProjectToProject(project);
    } catch {
      const projects = await getProjects();
      return projects.find((p) => p.id === slugOrId);
    }
  }

  const projects = await getProjects();
  return projects.find((p) => p.slug === slugOrId);
}

export function projectsForDisplay(projects: Project[]): Project[] {
  return projects.filter((p) => Boolean(p.imageUrl));
}
