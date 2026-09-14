import Link from "next/link";
import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-brand-deep)] text-white hover:bg-[#c81e5c] shadow-[0_2px_8px_rgba(232,48,112,0.35)]",
  secondary: "bg-[var(--color-brand-dark)] text-white hover:bg-[#151d2e]",
  outline:
    "border border-[var(--border-strong)] text-[var(--color-brand-dark)] bg-[var(--bg-elevated)] hover:border-[var(--color-brand-deep)] hover:text-[var(--color-brand-deep)]",
  ghost: "text-zinc-600 hover:text-[var(--color-brand-deep)] hover:bg-white/80",
  light:
    "bg-white text-[var(--color-brand-dark)] hover:bg-zinc-50 shadow-[0_2px_12px_rgba(12,18,34,0.12)]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 no-underline disabled:opacity-50 disabled:pointer-events-none";

type Base = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AsButton = Base &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = Base & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = AsButton | AsLink;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={cls} {...buttonProps}>
      {children}
    </button>
  );
}
