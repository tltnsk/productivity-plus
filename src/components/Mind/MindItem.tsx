"use client";

import { ItemOnMind } from "@/lib/types";
import { useTheme, alpha } from "@mui/material/styles";
import { X } from "lucide-react";
import { useState } from "react";

import { MdEdit } from "react-icons/md";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";

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
    <div className="flex items-center gap-3 w-full">
      <div
        className="flex items-center w-full gap-2 border rounded-sm shadow-xs p-4"
        style={{
          backgroundColor: alpha(theme.palette.background.paper, 0.3),
          borderColor: alpha(theme.palette.text.secondary, 0.2),
        }}
        onDoubleClick={() => {
          setDraftText(item.description);
          setIsEditing(true);
        }}
      >
        <div className="flex-1 min-w-0">
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
          onClick={() => deleteIdea(item.id)}
        />
      </div>
      <Link
        href={`/mind/${item.id}`}
        className="text-gray-500 hover:text-gray-800"
        title="Open idea"
      >
        <Tooltip title="Work on your idea">
          <span>
            <MdEdit size={30} />
          </span>
        </Tooltip>
      </Link>
    </div>
  );
}
