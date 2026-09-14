import type { ComponentProps } from "react";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Props = ComponentProps<"div">;

export function Skeleton({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-700/40",
        className,
      )}
      aria-hidden
      {...props}
    />
  );
}
