"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getProjects,
  getProjectById,
  projectsForDisplay,
} from "@/lib/api/projects";
import { projectKeys } from "@/lib/api/query-keys";

export function useProjectsQuery() {
  return useQuery({
    queryKey: projectKeys.list(),
    queryFn: getProjects,
  });
}

export function useProjectsForDisplayQuery() {
  return useQuery({
    queryKey: [...projectKeys.list(), "display"] as const,
    queryFn: async () => projectsForDisplay(await getProjects()),
  });
}

export function useProjectQuery(slug: string) {
  return useQuery({
    queryKey: projectKeys.detail(slug),
    queryFn: () => getProjectById(slug),
    enabled: Boolean(slug),
  });
}
