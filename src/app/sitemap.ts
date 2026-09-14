import type { MetadataRoute } from "next";
import { getCareers } from "@/lib/api/careers";
import { getProjects } from "@/lib/api/projects";
import { getServices } from "@/lib/api/services";
import { absoluteUrl } from "@/lib/seo/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [careers, services, projects] = await Promise.all([
    getCareers(),
    getServices(),
    getProjects(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/clients",
    "/careers",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const careerRoutes = careers.map((c) => ({
    url: absoluteUrl(`/careers/${c.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...careerRoutes];
}
