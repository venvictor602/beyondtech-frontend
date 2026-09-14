import { NextResponse } from "next/server";
import { SERVICES, SITE } from "@/lib/content";
import { SEO } from "@/lib/seo/constants";

export function GET() {
  const serviceLines = SERVICES.map(
    (service) => `- ${service.name}: ${SEO.siteUrl}/services/${service.slug}`,
  ).join("\n");

  const body = `# Beyond Tech

> ${SEO.defaultDescription}

- Website: ${SEO.siteUrl}
- Email: ${SITE.contact.email}
- Phone: ${SITE.contact.phone}
- Location: ${SITE.contact.addressLine}
- Hours: ${SITE.contact.hours}

## What we build

${SITE.home.introParagraphs.join("\n\n")}

## Services

${serviceLines}

## Key pages

- Home: ${SEO.siteUrl}/
- Services: ${SEO.siteUrl}/services
- Projects: ${SEO.siteUrl}/projects
- About: ${SEO.siteUrl}/about
- Contact: ${SEO.siteUrl}/contact
- FAQ: ${SEO.siteUrl}/faq
- Careers: ${SEO.siteUrl}/careers
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
