import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectsListView } from "@/components/projects/ProjectsListView";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";

export const metadata = pageMetadata({
  title: "Software projects and case studies",
  description:
    "Beyond Tech case studies: custom software, attendance systems, automation and digital platforms delivered for schools, businesses, churches and organizations in Nigeria.",
  path: "/projects",
  keywords: [
    "Beyond Tech projects",
    "software case study Nigeria",
    "attendance system case study",
    "custom software portfolio Port Harcourt",
  ],
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects" },
        ])}
      />
      <PageHeader
        eyebrow="Portfolio"
        title="Projects & case studies"
        description={SITE.pages.projectsLead}
      />
      <ProjectsListView />
    </>
  );
}
