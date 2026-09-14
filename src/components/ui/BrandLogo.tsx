"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/content";

const LOGO_INTRINSIC = {
  full: {
    default: { width: 305, height: 78 },
    "on-dark": { width: 282, height: 252 },
    "on-white": { width: 282, height: 252 },
  },
  icon: { width: 184, height: 189 },
} as const;

const LOGO_SRC = {
  full: {
    default: "/brand/logo.png",
    "on-dark": "/brand/logo-on-dark.png",
    "on-white": "/brand/logo-on-white.png",
  },
  icon: {
    default: "/brand/icon.png",
    "on-dark": "/brand/icon.png",
  },
} as const;

type Mark = "full" | "icon";
type Variant = "default" | "on-dark" | "on-white";

type Props = {
  mark?: Mark;
  variant?: Variant;
  className?: string;
  href?: string;
  onClick?: () => void;
  priority?: boolean;
};

export function BrandLogo({
  mark = "full",
  variant = "default",
  className = "h-10 sm:h-12 w-auto max-w-[min(100%,240px)]",
  href = "/",
  onClick,
  priority = false,
}: Props) {
  const intrinsic =
    mark === "full" ? LOGO_INTRINSIC.full[variant] : LOGO_INTRINSIC.icon;
  const src =
    mark === "full"
      ? LOGO_SRC.full[variant]
      : LOGO_SRC.icon[variant === "on-white" ? "default" : variant];
  const alt = `${SITE.fullName} logo`;

  const image = (
    <Image
      src={src}
      alt={alt}
      width={intrinsic.width}
      height={intrinsic.height}
      sizes="(max-width: 640px) 220px, 280px"
      className={`object-contain object-left shrink-0 ${className}`}
      priority={priority}
    />
  );

  if (!href) {
    return (
      <span className="inline-flex items-center leading-none">{image}</span>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center shrink-0 leading-none no-underline rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-deep)]"
      onClick={onClick}
      aria-label={`${SITE.brand} home`}
    >
      {image}
    </Link>
  );
}
