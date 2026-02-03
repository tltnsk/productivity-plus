"use client";
import { useTheme, alpha } from "@mui/material/styles";

type ExtendThoughtProps = {
  id: string;
  content: string;
};

export default function ExtendThought({ content, id }: ExtendThoughtProps) {
  const theme = useTheme();
  return (
    <div
      key={id}
      className="w-full border rounded-sm bg-neutral-700 outline-none focus:ring-0  font-black p-4 overflow-auto"
      style={{
        backgroundColor: alpha(theme.palette.background.paper, 0.3),
        borderColor: alpha(theme.palette.text.secondary, 0.2),
      }}
    >
      {content}
    </div>
  );
}
