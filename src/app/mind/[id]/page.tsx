"use client";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { ItemOnMind } from "@/lib/types";

export default function MindPage() {
  const { id } = useParams();

  const [ideas, setIdeas] = useState<ItemOnMind | null>(null);

  useEffect(() => {
    // fetch ideas from local storage
    const storedIdeas = localStorage.getItem("ideas");
    if (storedIdeas) {
      const allIdeas: ItemOnMind[] = JSON.parse(storedIdeas);
      const currentIdea = allIdeas.find((idea) => idea.id === id);
      setIdeas(currentIdea || null);
    }
  }, []);

  if (!ideas) {
    return <p>Idea not found.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="mt-2">{ideas.description}</h1>
    </div>
  );
}
