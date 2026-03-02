"use client";
import { ContentBlock } from "@/lib/types";
import ExtendThought from "./ExtendThought";

type ThoughtListProps = {
  thoughts: ContentBlock[];
  deleteThought: (thoughtId: string) => void;
};

export default function ThoughtList({
  thoughts,
  deleteThought,
}: ThoughtListProps) {
  if (!thoughts.length) return null;

  return (
    <div className="mx-auto mt-5 w-full max-w-4xl">
      <div className="flex flex-wrap justify-center gap-6">
        {thoughts.map((thought, index) => {
          const rowOffset =
            index % 4 === 0
              ? "0.75rem"
              : index % 4 === 1
                ? "1.5rem"
                : index % 4 === 2
                  ? "0rem"
                  : "2.25rem";

          return (
            <div
              key={thought.id}
              className="max-w-xs"
              style={{ marginTop: rowOffset }}
            >
              <ExtendThought
                id={thought.id}
                content={thought.content}
                deleteThought={deleteThought}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
