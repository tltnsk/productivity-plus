"use client";
import { ContentBlock } from "@/lib/types";
import { useTheme, alpha } from "@mui/material/styles";
import { useState } from "react";
import { X } from "lucide-react";

type ExtendThoughtProps = {
  id: string;
  content: string;
  deleteThought: (thoughtId: string) => void;
};

export default function ExtendThought({
  content,
  id,
  deleteThought,
}: ExtendThoughtProps) {
  const theme = useTheme();

  return (
    <div
      key={id}
      className="flex justify-between items-center w-full max-w-xl border rounded-sm bg-neutral-700 outline-none focus:ring-0 font-black p-4 overflow-auto"
      style={{
        backgroundColor: alpha(theme.palette.background.paper, 0.3),
        borderColor: alpha(theme.palette.text.secondary, 0.2),
      }}
    >
      <div className="flex-1">{content}</div>

      <button className="ml-2" onClick={() => deleteThought(id)}>
        <X className="cursor-pointer mr-2" size={20} strokeWidth={1} />
      </button>
    </div>
  );
}
