import type { ApiCareer, ApiFaq, ApiProject, ApiService } from "@/types/api";
import type { CareerRole, Faq, Project, Service } from "@/types/content";

const DEFAULT_SERVICE_IMAGE =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80";
const DEFAULT_PROJECT_IMAGE =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80";

const ICON_ALIASES: Record<string, string> = {
  "bar-chart": "chart",
  cpu: "workflow",
  zap: "workflow",
};

export function normalizeServiceIcon(icon?: string | null): string {
  if (!icon) return "code";
  const key = icon.toLowerCase().trim();
  return ICON_ALIASES[key] ?? key;
}

export function textToBulletList(text: string): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n+/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function serviceSlug(id: number | string, name: string): string {
  return `${id}-${slugify(name)}`;
}

export function parseServiceIdFromSlug(slug: string): string | null {
  const match = slug.match(/^(\d+)(?:-|$)/);
  return match ? match[1] : null;
}

export function mapApiFaqToFaq(faq: ApiFaq): Faq {
  return {
    id: String(faq.id),
    category: faq.category || "General",
    question: faq.question,
    answer: faq.answer,
  };
}

export function mapApiCareerToRole(career: ApiCareer): CareerRole {
  const benefits = textToBulletList(career.benefits);

  return {
    id: String(career.id),
    slug: String(career.id),
    title: career.title,
    location: career.location,
    type: career.department || "Full-time",
    summary:
      career.description.length > 220
        ? `${career.description.slice(0, 217).trim()}…`
        : career.description,
    about: career.description,
    responsibilities: textToBulletList(career.responsibilities),
    requirements: textToBulletList(career.requirements),
    niceToHave: benefits.length > 0 ? benefits : undefined,
    department: career.department,
    salaryRange: career.salary_range || undefined,
    deadline: career.deadline || undefined,
  };
}

export function mapApiServiceToService(service: ApiService): Service {
  const highlights =
    service.at_a_glance_checklist && service.at_a_glance_checklist.length > 0
      ? service.at_a_glance_checklist
      : textToBulletList(service.at_a_glance_points ?? "");

  const benefits = (service.benefits ?? []).map((item) => ({
    title: item.title,
    description: item.description,
  }));

  const keyFeatures = (service.key_features ?? []).map((item) => ({
    title: item.title,
    description: item.description,
  }));

  return {
    id: String(service.id),
    slug: serviceSlug(service.id, service.name),
    name: service.name,
    summary: service.subtitle || truncate(service.description, 180),
    icon: normalizeServiceIcon(service.icon),
    highlights:
      highlights.length > 0 ? highlights : [service.subtitle || service.name],
    image: service.image || null,
    imageUrl: service.image || DEFAULT_SERVICE_IMAGE,
    overview: service.description,
    audience: service.who_is_it_for || "",
    whatWeDeliverSubtitle: service.what_we_deliver_subtitle,
    howWeWorkSubtitle: service.how_we_work_subtitle,
    atAGlanceText: service.at_a_glance_text,
    benefits,
    keyFeatures,
  };
}

type ProjectSubtitle = { title: string; description: string };

export function buildProjectSubtitles(project: ApiProject): ProjectSubtitle[] {
  const pairs: Array<[string | null | undefined, string | null | undefined]> = [
    [project.subtitle1, project.subtitle1_description],
    [project.subtitle2, project.subtitle2_description],
    [project.subtitle3, project.subtitle3_description],
    [project.subtitle4, project.subtitle4_description],
    [project.subtitle5, project.subtitle5_description],
    [project.subtitle6, project.subtitle6_description],
  ];

  return pairs
    .map(([title, description]) => ({
      title: (title ?? "").trim(),
      description: (description ?? "").trim(),
    }))
    .filter((item) => item.title.length > 0 || item.description.length > 0);
}

export function mapApiProjectToProject(project: ApiProject): Project {
  const subtitles = buildProjectSubtitles(project);
  const galleryImages = [
    project.supporting_image1,
    project.supporting_image2,
  ].filter((src): src is string => Boolean(src?.trim()));
  const heroImage =
    project.banner_image || galleryImages[0] || DEFAULT_PROJECT_IMAGE;

  const apiOutcomes = [...(project.outcomes ?? [])]
    .sort((a, b) => a.order - b.order)
    .map((item) => item.outcome.trim())
    .filter(Boolean);

  const linkedServices = (project.services ?? []).map(mapApiServiceToService);

  const context =
    project.background_description?.trim() ||
    subtitles[0]?.description ||
    (project.description || "").trim();
  const challenge =
    project.challenge_description?.trim() ||
    subtitles[1]?.description ||
    subtitles[1]?.title ||
    "";
  const approach =
    project.approach_description?.trim() ||
    subtitles[2]?.description ||
    subtitles
      .slice(2)
      .map((s) => s.description)
      .filter(Boolean)
      .join("\n\n");

  return {
    id: String(project.id),
    slug: project.slug || String(project.id),
    title: project.name,
    client: project.client?.trim() || "Beyond Tech client",
    sector: project.sector?.trim() || "Enterprise",
    year: project.year?.trim() || new Date().getFullYear().toString(),
    summary: truncate((project.description || "").trim(), 220),
    context,
    challenge,
    approach,
    backgroundTitle: project.background_title?.trim() || undefined,
    challengeTitle: project.challenge_title?.trim() || undefined,
    approachTitle: project.approach_title?.trim() || undefined,
    outcomesCountText: project.outcomes_count_text?.trim() || undefined,
    outcomes:
      apiOutcomes.length > 0
        ? apiOutcomes
        : project.call_to_action?.trim()
          ? [project.call_to_action.trim()]
          : ["Delivered on scope and timeline"],
    services: linkedServices.map((service) => service.slug),
    appliedServices: linkedServices.length > 0 ? linkedServices : undefined,
    imageUrl: heroImage,
    galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
    extraSections: subtitles.length > 0 ? subtitles : undefined,
    callToAction: project.call_to_action?.trim() || undefined,
  };
}
