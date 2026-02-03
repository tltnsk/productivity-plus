"use client";
import { ContentBlock } from "@/lib/types";
import ExtendThought from "./ExtendThought";

type ThoughtListProps = {
  thoughts: ContentBlock[];
};

export default function ThoughtList({ thoughts }: ThoughtListProps) {
  return (
    <ul className="space-y-4 mt-5 py-2 px-4">
      {thoughts.map((thought) => (
        <li key={thought.id}>
          <div className="flex flex-row">
            <ExtendThought id={thought.id} content={thought.content} />
          </div>
        </li>
      ))}
    </ul>
  );
}
