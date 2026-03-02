"use client";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { ItemOnMind } from "@/lib/types";
import ThoughtList from "@/components/Mind/ThoughtsList";

import { Header } from "@/components/Header";

export default function MindPage() {
  const { id } = useParams();

  const [idea, setIdea] = useState<ItemOnMind | null>(null);
  const [input, setInput] = useState("");

  const deleteThought = (thoughtId: string) => {
    if (!idea) return;

    const updatedBlocks = (idea.blocks ?? []).filter(
      (thought) => thought.id !== thoughtId,
    );
    const updatedIdea: ItemOnMind = {
      ...idea,
      blocks: updatedBlocks,
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
  };

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
    const normalizedBlocks = (found.blocks ?? []).map((block) => ({
      ...block,
      id: block.id ?? crypto.randomUUID(),
    }));

    const currentIdea: ItemOnMind = {
      ...found,
      blocks: normalizedBlocks,
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
    <div>
      <Header />

      <div className="p-8">
        <h1 className="mt-2 text-3xl">{idea.description}</h1>

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
          className="mt-4 mb-8 w-full focus:border-transparent"
        />

        {/* render existing sub-ideas / thoughts */}
        <ThoughtList
          thoughts={idea.blocks ?? []}
          deleteThought={deleteThought}
        />
      </div>
    </div> 
  );
}
