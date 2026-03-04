"use client";

import { ItemOnMind } from "@/lib/types";
import { useTheme, alpha } from "@mui/material/styles";
import { X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(item.description);

  const openIdea = () => {
    router.push(`/mind/${item.id}`);
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <div
        className="flex items-center w-full gap-2 border rounded-sm shadow-xs p-4 cursor-pointer"
        style={{
          backgroundColor: alpha(theme.palette.background.paper, 0.3),
          borderColor: alpha(theme.palette.text.secondary, 0.2),
        }}
        onClick={openIdea}
      >
        <div
          className="flex-1 min-w-0"
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => {
            e.stopPropagation();
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
            <span className="font-black">{item.description}</span>
          )}
        </div>

        <X
          className="cursor-pointer shrink-0"
          size={20}
          onClick={(e) => {
            e.stopPropagation();
            deleteIdea(item.id);
          }}
        />
      </div>
    </div>
  );
}
