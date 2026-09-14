export type ServiceDeliverable = {
  title: string;
  description: string;
};

export type ServiceStep = {
  title: string;
  description: string;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  icon: string;
  highlights: string[];
  image: string | null;
  imageUrl: string;
  overview: string;
  audience: string;
  whatWeDeliverSubtitle?: string;
  howWeWorkSubtitle?: string;
  atAGlanceText?: string;
  benefits: ServiceDeliverable[];
  keyFeatures: ServiceStep[];
};

export type ProjectSection = {
  title: string;
  description: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  summary: string;
  outcomes: string[];
  services: string[];
  appliedServices?: Service[];
  imageUrl: string;
  challenge: string;
  approach: string;
  context: string;
  backgroundTitle?: string;
  challengeTitle?: string;
  approachTitle?: string;
  outcomesCountText?: string;
  extraSections?: ProjectSection[];
  galleryImages?: string[];
  callToAction?: string;
};

export type Client = {
  id: string;
  name: string;
  sector: string;
  description: string;
  logo?: string;
};

export type Faq = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export type CareerRole = {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  department?: string;
  salaryRange?: string;
  deadline?: string;
};
