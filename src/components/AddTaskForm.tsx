import { useState } from "react";

type AddTaskFormProps = {
  onAddTask(description: string, difficulty: number, priority: number): void;
};

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<number>(5);
  const [priority, setPriority] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) return;

    onAddTask(description, difficulty, priority);

    setDescription("");
    setDifficulty(5);
    setPriority(5);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-4 border rounded-md space-y-3"
    >
      <div>
        <label className="block text-sm font-medium">Description</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex space-x-3">
        <div className="flex-1">
          <label className="block text-sm font-medium">Difficulty (1–10)</label>
          <input
            type="number"
            min={1}
            max={10}
            className="w-full mt-1 p-2 border rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium">Priority (1–10)</label>
          <input
            type="number"
            min={1}
            max={10}
            className="w-full mt-1 p-2 border rounded"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          />
        </div>
      </div>
      <button type="submit" className="w-full py-2 border rounded font-medium">
        Add task
      </button>
    </form>
  );
}
