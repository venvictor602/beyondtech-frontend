import type { MetadataRoute } from "next";
import { getCareers } from "@/lib/api/careers";
import { getProjects } from "@/lib/api/projects";
import { getServices } from "@/lib/api/services";
import { absoluteUrl } from "@/lib/seo/metadata";

const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.7 },
  { path: "/clients", changeFrequency: "monthly", priority: 0.6 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [careers, services, projects] = await Promise.all([
    getCareers(),
    getServices(),
    getProjects(),
  ]);

  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceRoutes = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
    images: service.imageUrl ? [service.imageUrl] : undefined,
  }));

  const projectRoutes = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: project.imageUrl ? [project.imageUrl] : undefined,
  }));

  const careerRoutes = careers.map((career) => ({
    url: absoluteUrl(`/careers/${career.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.55,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...careerRoutes];
}
