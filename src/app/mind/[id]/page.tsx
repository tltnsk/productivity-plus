"use client";

import { ItemOnMind } from "@/lib/types";
import { useState } from "react";

export default function MindPage() {
  const getIdeaFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id;
  };

  const ideaId = getIdeaFromUrl();
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Mind Page</h1>
        <p className="mt-2">This is the mind page with # parameter.</p>
      </div>
    </>
  );
}
