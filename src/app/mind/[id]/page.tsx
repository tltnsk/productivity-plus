"use client";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { ContentBlock, ItemOnMind } from "@/lib/types";

import { Header } from "@/components/Header";

export default function MindPage() {
  const { id } = useParams();

  const [idea, setIdea] = useState<ItemOnMind | null>(null);
  const [text, setText] = useState("");

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
    const normalizedBlocks: ContentBlock[] = (found.blocks ?? []).map((block) => ({
      ...block,
      id: block.id ?? crypto.randomUUID(),
    }));

    const currentIdea: ItemOnMind = {
      ...found,
      blocks: normalizedBlocks,
    };
    setIdea(currentIdea);
    const initialText =
      normalizedBlocks && normalizedBlocks.length
        ? normalizedBlocks.map((block) => block.content).join("\n\n")
        : "";
    setText(initialText);
  }, [id]);

  const updateIdeaText = (newText: string) => {
    if (!idea) return;

    const blocks: ContentBlock[] = [
      {
        id: idea.blocks?.[0]?.id ?? crypto.randomUUID(),
        type: "text",
        content: newText,
      },
    ];

    const updatedIdea: ItemOnMind = {
      ...idea,
      blocks,
    };

    setIdea(updatedIdea);
    setText(newText);

    const storedIdeas = localStorage.getItem("ideas");
    if (!storedIdeas) return;

    const allIdeas: ItemOnMind[] = JSON.parse(storedIdeas);
    const updatedIdeas = allIdeas.map((i) =>
      i.id === idea.id ? updatedIdea : i,
    );

    localStorage.setItem("ideas", JSON.stringify(updatedIdeas));
  };

  if (!idea) {
    return <p>Idea not found.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-8">
        <h1 className="mt-2 text-3xl">{idea.description}</h1>

        <textarea
          value={text}
          onChange={(e) => updateIdeaText(e.target.value)}
          placeholder="Type all your thoughts here..."
          className="mt-6 w-full h-[calc(100vh-10rem)] bg-transparent border-none outline-none focus:outline-none resize-none text-base leading-relaxed"
        />
      </div>
    </div> 
  );
}
