"use client";
import { ItemOnMind } from "@/lib/types";
import MindItem from "@/components/Mind/MindItem";
import Link from "next/link";

type MindListProps = {
  items: ItemOnMind[];
  deleteIdea: (itemId: string) => void;
  updateIdea: (itemId: string, text: string) => void;
};

export default function MindList({
  items,
  deleteIdea,
  updateIdea,
}: MindListProps) {
  return (
    <ul className="space-y-4 mt-5 py-2 px-4">
      {items.map((item) => (
        <li key={item.id}>
          <Link href={`/mind/${item.id}`}>
            <MindItem
              item={item}
              deleteIdea={deleteIdea}
              updateIdea={updateIdea}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
