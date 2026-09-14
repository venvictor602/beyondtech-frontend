export type ApiPaginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ApiFaq = {
  id: number;
  question: string;
  answer: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ApiServiceFeature = {
  id: number;
  title: string;
  description: string;
  created_at?: string;
};

export type ApiServiceBenefit = {
  id: number;
  title: string;
  description: string;
  created_at?: string;
};

export type ApiService = {
  id: number;
  name: string;
  subtitle?: string;
  icon?: string;
  description: string;
  who_is_it_for?: string;
  what_we_deliver_subtitle?: string;
  how_we_work_subtitle?: string;
  at_a_glance_text?: string;
  at_a_glance_points?: string;
  at_a_glance_checklist?: string[];
  image?: string | null;
  key_features?: ApiServiceFeature[];
  benefits?: ApiServiceBenefit[];
  is_active?: boolean;
  order?: number;
  created_at?: string;
  updated_at?: string;
};

export type ApiProjectOutcome = {
  id: number;
  outcome: string;
  order: number;
};

export type ApiProject = {
  id: number;
  name: string;
  slug: string;
  description: string;
  client: string;
  sector: string;
  year: string;
  banner_image?: string | null;
  supporting_image1?: string | null;
  supporting_image2?: string | null;
  outcomes?: ApiProjectOutcome[];
  services?: ApiService[];
  outcomes_count_text?: string | null;
  background_title?: string | null;
  background_description?: string | null;
  challenge_title?: string | null;
  challenge_description?: string | null;
  approach_title?: string | null;
  approach_description?: string | null;
  subtitle1?: string | null;
  subtitle1_description?: string | null;
  subtitle2?: string | null;
  subtitle2_description?: string | null;
  subtitle3?: string | null;
  subtitle3_description?: string | null;
  subtitle4?: string | null;
  subtitle4_description?: string | null;
  subtitle5?: string | null;
  subtitle5_description?: string | null;
  subtitle6?: string | null;
  subtitle6_description?: string | null;
  call_to_action?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type ApiContactService = {
  id: number;
  name: string;
  subtitle?: string;
  is_active?: boolean;
};

export type ApiTestimony = {
  id: number;
  client_name: string;
  company_name: string;
  designation: string;
  message: string;
  image: string | null;
  created_at: string;
  updated_at: string;
};

export type ApiContactPayload = {
  full_name: string;
  email: string;
  address: string;
  company_name: string;
  subject: string;
  services: number[];
  message: string;
};

export type ApiCareer = {
  id: number;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  salary_range: string;
  deadline: string;
  created_at: string;
  updated_at: string;
};
