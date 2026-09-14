import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "groundsup.vercel.app", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/team", destination: "/clients", permanent: true },
      {
        source: "/services/industrial-control",
        destination: "/services/business-automation",
        permanent: true,
      },
      {
        source: "/services/electrical-instrumentation",
        destination: "/services/business-automation",
        permanent: true,
      },
      {
        source: "/services/custom-software",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/cloud-devops",
        destination: "/services/cloud-digital-infrastructure",
        permanent: true,
      },
      {
        source: "/services/advanced-analytics",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/software-automation",
        destination: "/services/business-automation",
        permanent: true,
      },
      {
        source: "/services/product-design",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/technology-consulting",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/executive-dashboards",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/data-platform-strategy",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/1",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/2",
        destination: "/services/cloud-digital-infrastructure",
        permanent: true,
      },
      {
        source: "/services/3",
        destination: "/services/smart-attendance-workforce-management",
        permanent: true,
      },
      {
        source: "/services/4",
        destination: "/services/business-automation",
        permanent: true,
      },
      {
        source: "/services/1-custom-software-development",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/2-cloud-and-devops",
        destination: "/services/cloud-digital-infrastructure",
        permanent: true,
      },
      {
        source: "/services/3-advanced-analytics-and-intelligent-data-solutions",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/4-process-automation-and-workflow-optimization",
        destination: "/services/business-automation",
        permanent: true,
      },
      {
        source: "/projects/icss-terminal-upgrade",
        destination: "/projects/operations-dashboard-manufacturing",
        permanent: true,
      },
      {
        source: "/projects/ei-as-built",
        destination: "/projects/logistics-portal-cargo-transit",
        permanent: true,
      },
      {
        source: "/projects/operations-workflow-automation",
        destination: "/projects/operations-dashboard-manufacturing",
        permanent: true,
      },
      {
        source: "/projects/plant-dashboard",
        destination: "/projects/operations-dashboard-manufacturing",
        permanent: true,
      },
      {
        source: "/projects/document-workflow-automation",
        destination: "/projects/logistics-portal-cargo-transit",
        permanent: true,
      },
      {
        source: "/projects/api-integration-hub",
        destination: "/projects/logistics-portal-cargo-transit",
        permanent: true,
      },
      {
        source: "/projects/field-data-capture",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/careers/instrumentation-engineer",
        destination: "/careers/software-automation-engineer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
