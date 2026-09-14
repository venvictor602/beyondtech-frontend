import { getCareers, getCareerById } from "@/lib/api/careers";
import { JsonLd } from "@/components/seo/JsonLd";
import { CareerDetailView } from "@/components/careers/CareerDetailView";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, jobPostingJsonLd } from "@/lib/seo/structured-data";
import { SITE } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const careers = await getCareers();
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const role = await getCareerById(slug);
  if (!role) return {};
  return pageMetadata({
    title: role.title,
    description: `${role.summary} ${role.location}. Join ${SITE.brand}.`,
    path: `/careers/${role.slug}`,
    keywords: [
      role.title,
      "Beyond Tech careers",
      "jobs Nigeria",
      role.location,
    ],
  });
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const role = await getCareerById(slug);

  const structuredData = role
    ? [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: role.title },
        ]),
        jobPostingJsonLd(role),
      ]
    : [];

  return (
    <>
      {structuredData.length > 0 && <JsonLd data={structuredData} />}
      <CareerDetailView slug={slug} />
    </>
  );
}
