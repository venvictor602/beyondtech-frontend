import { APP_ENV } from "@/config/env";
import { SITE } from "@/lib/content";
import {
  isValidEmail,
  isValidMessage,
  isValidName,
} from "@/lib/form-validation";
import type { ApiContactPayload } from "@/types/api";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const fullName = String(data.fullName ?? data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const address = String(data.address ?? "").trim();
  const companyName = String(data.companyName ?? data.company ?? "").trim();
  const subject = String(data.subject ?? "").trim();
  const phone = String(data.phone ?? "").trim();

  const serviceIds = Array.isArray(data.services)
    ? data.services
        .map((id) => Number(id))
        .filter((id) => Number.isInteger(id) && id > 0)
    : data.service
      ? [Number(data.service)].filter((id) => Number.isInteger(id) && id > 0)
      : [];

  if (!isValidName(fullName)) {
    return Response.json({ error: "Enter your full name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email." }, { status: 400 });
  }
  if (!isValidMessage(message, 20)) {
    return Response.json(
      { error: "Message must be at least 20 characters." },
      { status: 400 },
    );
  }

  const addressLine = [address, phone ? `Phone: ${phone}` : ""]
    .filter(Boolean)
    .join("\n");

  const payload: ApiContactPayload = {
    full_name: fullName,
    email,
    address: addressLine,
    company_name: companyName,
    subject:
      subject || String(data.serviceLabel ?? "").trim() || "Project enquiry",
    services: serviceIds,
    message,
  };

  try {
    const response = await fetch(`${APP_ENV.API_BASE_URL}/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      const msg = extractErrorMessage(err) ?? "Unable to forward your message.";
      throw new Error(msg);
    }
  } catch (err) {
    const isDev = process.env.NODE_ENV === "development";
    const unreachable =
      err instanceof Error &&
      (err.message.includes("fetch failed") ||
        err.message.includes("ECONNREFUSED"));

    if (isDev && unreachable) {
      console.warn("[contact] Backend unreachable; accepting locally.");
      return Response.json({ ok: true });
    }

    console.error("[contact]", err);
    return Response.json(
      {
        error:
          err instanceof Error
            ? err.message
            : `We could not send your message right now. Please email ${SITE.contact.email} directly.`,
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
