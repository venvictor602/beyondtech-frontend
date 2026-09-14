import { APP_ENV } from "@/config/env";
import { isValidEmail } from "@/lib/form-validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = String((body as { email?: string }).email ?? "").trim();

  if (!isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email." }, { status: 400 });
  }

  try {
    const response = await fetch(`${APP_ENV.API_BASE_URL}/contact/subscribe/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      const message =
        (err as { detail?: string } | null)?.detail ??
        "Unable to subscribe right now.";
      return Response.json({ error: message }, { status: response.status });
    }
  } catch (err) {
    const isDev = process.env.NODE_ENV === "development";
    const unreachable =
      err instanceof Error &&
      (err.message.includes("fetch failed") ||
        err.message.includes("ECONNREFUSED"));

    if (isDev && unreachable) {
      console.warn("[subscribe] Backend unreachable; accepting locally.");
      return Response.json({ ok: true });
    }

    console.error("[subscribe]", err);
    return Response.json(
      { error: "Subscription failed. Please try again later." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
