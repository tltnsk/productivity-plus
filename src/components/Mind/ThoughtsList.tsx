"use client";
import { ContentBlock } from "@/lib/types";
import ExtendThought from "./ExtendThought";

type ThoughtListProps = {
  thoughts: ContentBlock[];
};

export default function ThoughtList({ thoughts }: ThoughtListProps) {
  return (
    <ul className="mx-auto grid w-full max-w-6xl gap-4 mt-5 py-2 px-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
      {thoughts.map((thought) => (
        <li key={thought.id} className="w-full">
          <div className="flex flex-row">
            <ExtendThought id={thought.id} content={thought.content} />
          </div>
        </li>
      ))}
    </ul>
  );
}
