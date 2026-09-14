import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectsListView } from "@/components/projects/ProjectsListView";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Case studies from Beyond Tech: custom software, attendance systems, automation, and digital platforms for schools, businesses, churches and organizations.",
  path: "/projects",
  keywords: [
    "Beyond Tech projects",
    "software case study Nigeria",
    "attendance system case study",
    "custom software portfolio",
  ],
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Projects & case studies"
        description={SITE.pages.projectsLead}
      />
      <ProjectsListView />
    </>
  );
}
