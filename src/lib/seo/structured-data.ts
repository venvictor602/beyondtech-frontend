import { SERVICES, SITE } from "@/lib/content";
import type { CareerRole, Faq, Project, Service } from "@/types/content";
import { ORGANIZATION_ID, SEO, WEBSITE_ID } from "./constants";
import { absoluteUrl } from "./metadata";

const LOGO_URL = absoluteUrl("/brand/icon-512.png");
const IMAGE_URL = absoluteUrl("/opengraph-image");

function organizationRef() {
  return { "@id": ORGANIZATION_ID };
}

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
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.name,
    description: service.overview || service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    image: service.imageUrl,
    serviceType: service.name,
    category: service.name,
    audience: {
      "@type": "Audience",
      audienceType: service.audience,
    },
    provider: organizationRef(),
    areaServed: [
      { "@type": "City", name: SEO.geo.locality },
      { "@type": "State", name: SEO.geo.region },
      { "@type": "Country", name: SEO.geo.countryName },
    ],
    brand: {
      "@type": "Brand",
      name: SEO.siteName,
    },
  };
}

export function servicesItemListJsonLd(
  services: Service[] = SERVICES,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Beyond Tech services",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  };
}

export function projectJsonLd(project: Project): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: project.imageUrl,
    datePublished: `${project.year}-01-01`,
    inLanguage: SEO.language,
    author: organizationRef(),
    publisher: organizationRef(),
    articleSection: project.sector,
    keywords: [project.sector, ...project.services].join(", "),
    about: project.client,
  };
}

export function jobPostingJsonLd(role: CareerRole): Record<string, unknown> {
  const posted = new Date();
  const validThrough = new Date(posted);
  validThrough.setDate(validThrough.getDate() + 90);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.about || role.summary,
    url: absoluteUrl(`/careers/${role.slug}`),
    datePosted: posted.toISOString().split("T")[0],
    validThrough: validThrough.toISOString().split("T")[0],
    employmentType: "FULL_TIME",
    hiringOrganization: organizationRef(),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: SEO.geo.locality,
        addressRegion: SEO.geo.region,
        addressCountry: SEO.geo.country,
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: SEO.geo.countryName,
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
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORGANIZATION_ID,
    name: SITE.fullName,
    legalName: SITE.fullName,
    alternateName: ["Beyond Tech Nigeria", "BeyondTechNG", "beyondtechng.com"],
    url: SEO.siteUrl,
    description: SEO.defaultDescription,
    email: SEO.email,
    telephone: SEO.phoneE164,
    image: IMAGE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    ...(sameAs.length ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: SEO.geo.locality,
      addressRegion: SEO.geo.region,
      addressCountry: SEO.geo.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SEO.geo.latitude,
      longitude: SEO.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: SEO.geo.locality },
      { "@type": "State", name: SEO.geo.region },
      { "@type": "Country", name: SEO.geo.countryName },
    ],
    priceRange: "$$",
    currenciesAccepted: "NGN, USD",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SEO.email,
        telephone: SEO.phoneE164,
        areaServed: SEO.geo.country,
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SEO.email,
        telephone: SEO.phoneE164,
        areaServed: SEO.geo.country,
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: SERVICES.map((service) => service.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Beyond Tech services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
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
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.fullName,
    alternateName: ["Beyond Tech Nigeria", SITE.brandLine],
    url: SEO.siteUrl,
    description: SEO.defaultDescription,
    inLanguage: SEO.language,
    publisher: organizationRef(),
  };
}

export function siteGraphJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd()],
  };
}

export function contactPageJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Beyond Tech",
    url: absoluteUrl("/contact"),
    mainEntity: organizationRef(),
  };
}

export function aboutPageJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Beyond Tech",
    url: absoluteUrl("/about"),
    mainEntity: organizationRef(),
  };
}
