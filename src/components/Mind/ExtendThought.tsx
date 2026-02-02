"use client";

type ExtendThoughtProps = {
  id: string;
  content: string;
};

export default function ExtendThought({ content, id }: ExtendThoughtProps) {
  return (
    <div
      key={id}
      className="flex items-center w-full gap-2 border rounded-sm shadow-xs p-4"
    >
      {content}
    </div>
  );
}
