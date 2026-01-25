"use client";

import { ItemOnMind } from "@/lib/types";
import { useTheme, alpha } from "@mui/material/styles";
import { X } from "lucide-react";
import { useState } from "react";

type MindItemProps = {
  item: ItemOnMind;
  deleteIdea: (itemId: string) => void;
  updateIdea: (itemId: string, text: string) => void;
};

export default function MindItem({
  item,
  deleteIdea,
  updateIdea,
}: MindItemProps) {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(item.description);
  return (
    <div
      className="flex justify-between items-center space-x-3.5 border rounded-sm rounded-base shadow-xs bg-neutral-primary-soft transition-colors duration-150 p-4"
      style={{
        backgroundColor: alpha(theme.palette.background.paper, 0.3),
        borderColor: alpha(theme.palette.text.secondary, 0.2),
      }}
      onDoubleClick={() => {
        setDraftText(item.description);
        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <input
          value={draftText}
          autoFocus
          onChange={(e) => setDraftText(e.target.value)}
          className="w-full border-none outline-none focus:ring-0 bg-transparent font-black"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (updateIdea) {
                updateIdea(item.id, draftText);
              }
              setIsEditing(false);
            }

            if (e.key === "Escape") {
              setDraftText(item.description);
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <span className="font-black ">{item.description}</span>
      )}

      <X
        className="cursor-pointer"
        size={20}
        onClick={() => deleteIdea(item.id)}
      />
    </div>
  );
}
