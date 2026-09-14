import site from "@/data/site.json";
import clientsData from "@/data/clients.json";
import servicesData from "@/data/services.json";
import faqsData from "@/data/faqs.json";
import type { Client, Faq, Service } from "@/types/content";

export const SITE = site;

export const CLIENTS = clientsData as Client[];

export const SERVICES = servicesData as Service[];

export const FAQS = faqsData as Faq[];

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/clients", label: "Clients" },
  { href: "/careers", label: "Careers" },
] as const;
