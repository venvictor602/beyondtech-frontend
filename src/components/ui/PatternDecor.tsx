type PatternName =
  | "grid-light"
  | "grid-dark"
  | "dots"
  | "dots-dark"
  | "diagonal"
  | "diagonal-dark"
  | "cross"
  | "rings"
  | "rings-dark";

const PATTERN_CLASS: Record<PatternName, string> = {
  "grid-light": "pattern-grid-light",
  "grid-dark": "pattern-grid",
  dots: "pattern-dots",
  "dots-dark": "pattern-dots-dark",
  diagonal: "pattern-diagonal",
  "diagonal-dark": "pattern-diagonal-dark",
  cross: "pattern-cross",
  rings: "pattern-rings",
  "rings-dark": "pattern-rings-dark",
};

type Props = {
  pattern: PatternName;
  className?: string;
  opacity?: number;
  fade?: "none" | "bottom" | "edges";
};

export function PatternDecor({
  pattern,
  className = "",
  opacity = 1,
  fade = "none",
}: Props) {
  const fadeClass =
    fade === "bottom"
      ? "pattern-fade-bottom"
      : fade === "edges"
        ? "pattern-fade-edges"
        : "";

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none ${PATTERN_CLASS[pattern]} ${fadeClass} ${className}`}
      style={{ opacity }}
      aria-hidden
    />
  );
}
