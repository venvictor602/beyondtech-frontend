import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Page not found",
  description: "The page you requested could not be found.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="container-site py-24 text-center">
      <p className="text-6xl font-bold text-[var(--color-brand)]/30 m-0">404</p>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-slate-900 m-0 mt-4">
        Page not found
      </h1>
      <p className="text-slate-600 m-0 mt-3 max-w-md mx-auto">
        The link may be outdated. Head back home or contact us if you need help.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        <Button href="/" variant="secondary">
          Home
        </Button>
        <Button href="/contact" variant="outline">
          Contact
        </Button>
      </div>
    </div>
  );
}
