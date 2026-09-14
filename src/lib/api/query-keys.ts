export const serviceKeys = {
  all: ["services"] as const,
  list: () => [...serviceKeys.all, "list"] as const,
  detail: (slug: string) => [...serviceKeys.all, "detail", slug] as const,
};

export const projectKeys = {
  all: ["projects"] as const,
  list: () => [...projectKeys.all, "list"] as const,
  detail: (slug: string) => [...projectKeys.all, "detail", slug] as const,
};

export const careerKeys = {
  all: ["careers"] as const,
  list: () => [...careerKeys.all, "list"] as const,
  detail: (slug: string) => [...careerKeys.all, "detail", slug] as const,
};

export const faqKeys = {
  all: ["faqs"] as const,
  list: () => [...faqKeys.all, "list"] as const,
};

export const testimonyKeys = {
  all: ["testimonies"] as const,
  list: () => [...testimonyKeys.all, "list"] as const,
};

export const contactServiceKeys = {
  all: ["contact-services"] as const,
  list: () => [...contactServiceKeys.all, "list"] as const,
};
