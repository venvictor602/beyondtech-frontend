import { useMutation } from "@tanstack/react-query";

async function postSubscribe(email: string) {
  const res = await fetch("/api/contact/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) throw new Error(data.error ?? "Failed to subscribe.");
  return data;
}

export function useSubscribeMutation() {
  return useMutation({ mutationFn: postSubscribe });
}
