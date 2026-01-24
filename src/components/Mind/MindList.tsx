"use client";
import { ItemOnMind } from "@/lib/types";
import MindItem from "@/components/Mind/MindItem";

type MindListProps = {
  items: ItemOnMind[];
  deleteIdea: (itemId: string) => void;
};

export default function MindList({ items, deleteIdea }: MindListProps) {
  return (
    <ul className="space-y-4 mt-5 py-2 px-4">
      {items.map((item) => (
        // unique key to distinguish each item
        <li key={item.id}>
          <MindItem item={item} deleteIdea={deleteIdea} />
        </li>
      ))}
    </ul>
  );
}
