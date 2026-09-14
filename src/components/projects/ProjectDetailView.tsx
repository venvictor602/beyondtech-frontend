"use client";

import { notFound } from "next/navigation";
import {
  useProjectQuery,
  useProjectsQuery,
} from "@/hooks/api/use-projects-query";
import { useServicesQuery } from "@/hooks/api/use-services-query";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { ProjectCaseStudySkeleton } from "@/components/ui/skeletons";
import type { Service } from "@/types/content";

type Props = { slug: string };

function resolveProjectServices(
  serviceRefs: string[],
  allServices: Service[],
): (Service | undefined)[] {
  return serviceRefs.map(
    (ref) =>
      allServices.find((s) => s.slug === ref || s.id === ref) ??
      allServices.find((s) =>
        s.name.toLowerCase().includes(ref.replace(/-/g, " ").toLowerCase()),
      ),
  );
}

export function ProjectDetailView({ slug }: Props) {
  const { data: project, isPending } = useProjectQuery(slug);
  const { data: allProjects = [] } = useProjectsQuery();
  const { data: allServices = [] } = useServicesQuery();

  if (!isPending && !project) notFound();
  if (isPending || !project) return <ProjectCaseStudySkeleton />;

  const services =
    project.appliedServices && project.appliedServices.length > 0
      ? project.appliedServices
      : resolveProjectServices(project.services, allServices);

  return (
    <ProjectCaseStudy
      project={project}
      services={services}
      allProjects={allProjects}
    />
  );
}
