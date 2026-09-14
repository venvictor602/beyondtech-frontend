import { APP_ENV } from "@/config/env";
import { SITE } from "@/lib/content";
import { isValidEmail, isValidName, isValidPhone } from "@/lib/form-validation";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

type Props = { params: Promise<{ id: string }> };

function isValidFile(file: FormDataEntryValue | null): file is File {
  return file instanceof File && file.size > 0;
}

function validateResume(file: File): string | null {
  if (file.size > MAX_FILE_BYTES) {
    return "Resume must be 5 MB or smaller.";
  }
  if (!ALLOWED_RESUME_TYPES.has(file.type)) {
    return "Resume must be a PDF or Word document.";
  }
  return null;
}

export async function POST(request: Request, { params }: Props) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return Response.json({ error: "Invalid job id." }, { status: 400 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data." }, { status: 400 });
  }

  const fullName = formData.get("full_name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phoneNumber = formData.get("phone_number")?.toString().trim() ?? "";
  const coverLetterText =
    formData.get("cover_letter_text")?.toString().trim() ?? "";
  const resume = formData.get("resume");
  const coverLetterFile = formData.get("cover_letter_file");

  if (!isValidName(fullName)) {
    return Response.json({ error: "Enter your full name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email." }, { status: 400 });
  }
  if (!isValidPhone(phoneNumber, { required: true })) {
    return Response.json(
      { error: "Enter a valid phone number." },
      { status: 400 },
    );
  }
  if (!isValidFile(resume)) {
    return Response.json({ error: "Attach your resume." }, { status: 400 });
  }

  const resumeError = validateResume(resume);
  if (resumeError) {
    return Response.json({ error: resumeError }, { status: 400 });
  }

  if (isValidFile(coverLetterFile)) {
    const coverError = validateResume(coverLetterFile);
    if (coverError) {
      return Response.json(
        { error: coverError.replace("Resume", "Cover letter file") },
        { status: 400 },
      );
    }
  }

  const outbound = new FormData();
  outbound.append("full_name", fullName);
  outbound.append("email", email);
  outbound.append("phone_number", phoneNumber);
  outbound.append("resume", resume);
  if (coverLetterText) {
    outbound.append("cover_letter_text", coverLetterText);
  }
  if (isValidFile(coverLetterFile)) {
    outbound.append("cover_letter_file", coverLetterFile);
  }

  try {
    const response = await fetch(
      `${APP_ENV.API_BASE_URL}/careers/careers/${id}/apply/`,
      {
        method: "POST",
        body: outbound,
        signal: AbortSignal.timeout(60_000),
      },
    );

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      const message =
        extractErrorMessage(err) ?? "Unable to submit application.";
      return Response.json({ error: message }, { status: response.status });
    }
  } catch (err) {
    const isDev = process.env.NODE_ENV === "development";
    const unreachable =
      err instanceof Error &&
      (err.message.includes("fetch failed") ||
        err.message.includes("ECONNREFUSED"));

    if (isDev && unreachable) {
      console.warn("[careers/apply] Backend unreachable; accepting locally.");
      return Response.json({ ok: true });
    }

    console.error("[careers/apply]", err);
    return Response.json(
      {
        error: `We could not submit your application right now. Please email ${SITE.contact.careersEmail} directly.`,
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

function extractErrorMessage(err: unknown): string | null {
  if (!err || typeof err !== "object") return null;
  const record = err as Record<string, unknown>;
  if (typeof record.detail === "string") return record.detail;
  const firstField = Object.values(record).find(
    (v) => Array.isArray(v) && typeof v[0] === "string",
  ) as string[] | undefined;
  return firstField?.[0] ?? null;
}
