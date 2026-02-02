"use client";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { ItemOnMind } from "@/lib/types";
import ExtendThought from "@/components/Mind/ExtendThought";

export default function MindPage() {
  const { id } = useParams();

  const [idea, setIdea] = useState<ItemOnMind | null>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedIdeas = localStorage.getItem("ideas");
    if (!storedIdeas || !id) return;

    const allIdeas: ItemOnMind[] = JSON.parse(storedIdeas);
    const found = allIdeas.find((i) => i.id === id);
    if (!found) {
      setIdea(null);
      return;
    }
    // Normalize: ensure blocks exists (for ideas created before blocks were added)
    const currentIdea: ItemOnMind = {
      ...found,
      blocks: found.blocks ?? [],
    };
    setIdea(currentIdea);
  }, [id]);

  if (!idea) {
    return <p>Idea not found.</p>;
  }

  const addTextBlock = () => {
    if (!idea || !input.trim()) return;

    const blocks = idea.blocks ?? [];
    const updatedIdea: ItemOnMind = {
      ...idea,
      blocks: [
        ...blocks,
        { id: crypto.randomUUID(), type: "text", content: input },
      ],
    };

    // update local state
    setIdea(updatedIdea);

    // update localStorage
    const storedIdeas = localStorage.getItem("ideas");
    if (!storedIdeas) return;

    const allIdeas: ItemOnMind[] = JSON.parse(storedIdeas);
    const updatedIdeas = allIdeas.map((i) =>
      i.id === idea.id ? updatedIdea : i,
    );

    localStorage.setItem("ideas", JSON.stringify(updatedIdeas));
    setInput("");
  };

  return (
    <div className="p-8">
      <h1 className="mt-2">{idea.description}</h1>

      {/* add new text */}
      <input
        type="text"
        value={input}
        placeholder="Enter thoughts..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTextBlock();
          }
        }}
        className="mt-4 mb-8"
      />

      {/* render existing sub-ideas / thoughts */}
      {(idea.blocks ?? []).map((block) => {
        if (block.type === "text") {
          return (
            <ExtendThought
              key={block.id}
              id={block.id}
              content={block.content}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
