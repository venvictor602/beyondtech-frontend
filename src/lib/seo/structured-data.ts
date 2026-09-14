import { SITE } from "@/lib/content";
import type { CareerRole, Faq, Project, Service } from "@/types/content";
import { SEO } from "./constants";
import { absoluteUrl } from "./metadata";

export function breadcrumbJsonLd(
  items: { name: string; path?: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function serviceJsonLd(service: Service): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: {
      "@type": "Organization",
      name: SEO.siteName,
      url: SEO.siteUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    serviceType: service.name,
  };
}

export function projectJsonLd(project: Project): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    datePublished: `${project.year}-01-01`,
    author: {
      "@type": "Organization",
      name: SEO.siteName,
    },
    publisher: {
      "@type": "Organization",
      name: SEO.siteName,
      url: SEO.siteUrl,
    },
    articleSection: project.sector,
    keywords: [project.sector, ...project.services].join(", "),
  };
}

export function jobPostingJsonLd(role: CareerRole): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.summary,
    url: absoluteUrl(`/careers/${role.slug}`),
    datePosted: new Date().toISOString().split("T")[0],
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: SEO.siteName,
      sameAs: SEO.siteUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: role.location.split("/")[0].trim(),
        addressCountry: "NG",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Nigeria",
    },
    directApply: true,
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  const sameAs = [
    SITE.social.linkedin,
    SITE.social.twitter,
    SITE.social.github,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.fullName,
    alternateName: [SEO.siteName, "Beyond Tech Nigeria"],
    url: SEO.siteUrl,
    description: SITE.description,
    email: SEO.email,
    telephone: SEO.phone,
    logo: absoluteUrl("/brand/logo.png"),
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.contact.addressLine,
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: SEO.email,
      telephone: SEO.phone,
      areaServed: "NG",
      availableLanguage: ["English"],
    },
  };
}

export function faqPageJsonLd(faqs: Faq[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.fullName,
    alternateName: [SEO.siteName, SITE.brandLine],
    url: SEO.siteUrl,
    description: SEO.defaultDescription,
    inLanguage: "en-NG",
    publisher: {
      "@type": "Organization",
      name: SEO.siteName,
    },
  };
}
