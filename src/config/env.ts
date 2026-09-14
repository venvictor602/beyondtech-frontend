function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function getPublicEnv(name: string, fallback: string): string {
  return process.env[name]?.trim() || fallback;
}

export const APP_ENV = {
  API_BASE_URL: normalizeBaseUrl(
    getPublicEnv(
      "NEXT_PUBLIC_API_BASE_URL",
      "https://groundsup.vercel.app/api",
    ),
  ),
  SITE_URL: getPublicEnv("NEXT_PUBLIC_SITE_URL", "https://beyondtechng.com"),
  TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE?.trim() || "",
  GOOGLE_SITE_VERIFICATION:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "",
} as const;
