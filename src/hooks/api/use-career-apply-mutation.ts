import { useMutation } from "@tanstack/react-query";

export type CareerApplyPayload = {
  careerId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  coverLetterText?: string;
  resume: File;
  coverLetterFile?: File;
};

async function submitCareerApplication(payload: CareerApplyPayload) {
  const formData = new FormData();
  formData.append("full_name", payload.fullName);
  formData.append("email", payload.email);
  formData.append("phone_number", payload.phoneNumber);
  formData.append("resume", payload.resume);
  if (payload.coverLetterText) {
    formData.append("cover_letter_text", payload.coverLetterText);
  }
  if (payload.coverLetterFile) {
    formData.append("cover_letter_file", payload.coverLetterFile);
  }

  const res = await fetch(`/api/careers/${payload.careerId}/apply`, {
    method: "POST",
    body: formData,
  });

  const data = (await res.json().catch(() => null)) as {
    error?: string;
    ok?: boolean;
  } | null;

  if (!res.ok) {
    throw new Error(data?.error ?? "Unable to submit application.");
  }
}

export function useCareerApplyMutation() {
  return useMutation({ mutationFn: submitCareerApplication });
}
