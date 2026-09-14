import { getProjects, getProjectById } from "@/lib/api/projects";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo/structured-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectById(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: `${project.summary} ${project.sector} case study by Beyond Tech.`,
    path: `/projects/${project.slug}`,
    keywords: [
      project.title,
      project.sector,
      "Beyond Tech case study",
      "Nigeria",
    ],
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const project = await getProjectById(slug);

  const structuredData = project
    ? [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title },
        ]),
        projectJsonLd(project),
      ]
    : [];

  return (
    <>
      {structuredData.length > 0 && <JsonLd data={structuredData} />}
      <ProjectDetailView slug={slug} />
    </>
  );
}
