import { useMutation } from "@tanstack/react-query";

export type ContactPayload = {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  companyName?: string;
  subject?: string;
  message: string;
  services?: number[];
  serviceLabel?: string;
};

async function postContact(payload: ContactPayload) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) throw new Error(data.error ?? "Failed to send message.");
  return data;
}

export function useContactMutation() {
  return useMutation({ mutationFn: postContact });
}
