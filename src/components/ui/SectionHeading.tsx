type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  onDark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  onDark = false,
}: Props) {
  const alignClass =
    align === "center" ? "text-center mx-auto items-center" : "";
  const eyebrowClass = onDark ? "eyebrow eyebrow-on-dark" : "eyebrow";

  return (
    <div className={`max-w-2xl flex flex-col ${alignClass} ${className}`}>
      {eyebrow ? (
        <p
          className={`${eyebrowClass} m-0 mb-4 ${align === "center" ? "justify-center" : ""}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold m-0 tracking-tight leading-[1.15] ${
          onDark ? "text-white" : "text-[var(--color-brand-dark)]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`m-0 mt-4 leading-relaxed text-base max-w-xl ${
            onDark
              ? "text-[var(--text-muted-on-dark)]"
              : "text-[var(--text-muted)]"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
