"use client";

import { ItemOnMind } from "@/lib/types";

type MindItemProps = {
  item: ItemOnMind;
};

export default function MindItem({ item }: MindItemProps) {
  return (
    <div className="flex justify-between items-center space-x-3.5 space-y-4 bg-neutral-primary-soft transition-colors duration-150 p-4">
      <div className="w-full text-sm font-medium">{item.description}</div>
    </div>
  );
}
