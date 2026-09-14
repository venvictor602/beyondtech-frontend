import { ShowcaseRow } from "@/components/ui/ShowcaseRow";
import type { ShowcaseCardData } from "@/components/ui/ShowcaseRow";

export type ShowcaseListItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  card: ShowcaseCardData;
};

type Props = {
  items: ShowcaseListItem[];
};

export function ShowcaseList({ items }: Props) {
  return (
    <div>
      {items.map((item, i) => (
        <ShowcaseRow
          key={item.id}
          index={i + 1}
          title={item.title}
          description={item.description}
          href={item.href}
          linkLabel={item.linkLabel}
          reversed={i % 2 === 1}
          card={item.card}
        />
      ))}
    </div>
  );
}
