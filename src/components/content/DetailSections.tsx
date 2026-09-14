import type { ReactNode } from "react";

export function DetailSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-brand-dark)] m-0 mb-5 flex items-center gap-3">
        <span
          className="w-1 h-6 rounded-full bg-[var(--color-brand)] shrink-0"
          aria-hidden
        />
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ProseBlock({ children }: { children: ReactNode }) {
  return (
    <div className="text-[15px] sm:text-base text-[var(--text-muted)] leading-[1.75] space-y-4 [&>p]:m-0">
      {children}
    </div>
  );
}

export function NumberedSteps({
  steps,
}: {
  steps: { title: string; description: string }[];
}) {
  return (
    <ol className="list-none m-0 p-0 space-y-4">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="flex gap-4 p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]"
        >
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-dark)] text-sm font-semibold text-[var(--color-brand-on-dark)]"
            aria-hidden
          >
            {i + 1}
          </span>
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-brand-dark)] m-0 text-[15px]">
              {step.title}
            </h3>
            <p className="text-[var(--text-muted)] text-[15px] m-0 mt-2 leading-relaxed">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function DeliverableGrid({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <ul className="list-none m-0 p-0 grid sm:grid-cols-2 gap-5">
      {items.map((item) => (
        <li
          key={item.title}
          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-card)] border-t-2 border-t-[var(--color-brand)]"
        >
          <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-brand-dark)] m-0 text-base">
            {item.title}
          </h3>
          <p className="text-[var(--text-muted)] text-sm m-0 mt-3 leading-relaxed">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none m-0 p-0 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-[15px] text-[var(--text-muted)] leading-relaxed pl-1"
        >
          <span
            className="size-1.5 rounded-full bg-[var(--color-brand)] shrink-0 mt-2.5"
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
