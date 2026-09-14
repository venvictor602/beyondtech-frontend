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
  SITE_URL: getPublicEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3001"),
  TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE?.trim() || "",
} as const;
