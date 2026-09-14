import { FAQS } from "@/lib/content";
import type { Faq } from "@/types/content";

export async function getFaqs(): Promise<Faq[]> {
  return FAQS;
}
