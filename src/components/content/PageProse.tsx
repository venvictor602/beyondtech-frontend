type Props = {
  lead?: string;
  paragraphs?: string[];
  className?: string;
  maxWidth?: "md" | "lg" | "xl" | "2xl" | "3xl" | "none";
};

const MAX_WIDTH = {
  md: "max-w-2xl",
  lg: "max-w-3xl",
  xl: "max-w-4xl",
  "2xl": "max-w-5xl",
  "3xl": "max-w-6xl",
  none: "",
} as const;

export function PageProse({
  lead,
  paragraphs = [],
  className = "",
  maxWidth = "3xl",
}: Props) {
  if (!lead && paragraphs.length === 0) return null;

  return (
    <div className={`space-y-4 ${MAX_WIDTH[maxWidth]} ${className}`}>
      {lead ? (
        <p className="m-0 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
          {lead}
        </p>
      ) : null}
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph.slice(0, 48)}
          className="m-0 text-[15px] sm:text-base text-[var(--text-muted)] leading-[1.75]"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
