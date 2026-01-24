"use client";

import { ItemOnMind } from "@/lib/types";
import { useTheme, alpha } from "@mui/material/styles";
import { X } from "lucide-react";

type MindItemProps = {
  item: ItemOnMind;
};

export default function MindItem({ item }: MindItemProps) {
  const theme = useTheme();
  return (
    <div
      className="flex justify-between items-center space-x-3.5 border rounded-sm rounded-base shadow-xs bg-neutral-primary-soft transition-colors duration-150 p-4"
      style={{
        backgroundColor: alpha(theme.palette.background.paper, 0.3),
        borderColor: alpha(theme.palette.text.secondary, 0.2),
      }}
    >
      <div className="font-black ">{item.description}</div>

      <X className="cursor-pointer" size={20} />
    </div>
  );
}
