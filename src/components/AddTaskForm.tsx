/**
 * AddTaskForm Component
 *
 * Used to add a new task.
 * User enters description, difficulty and priority for each task
 *
 * when they are submitted, the values are passed to the parent via onAddTask
 */

import { useState } from "react";
import Button from "@mui/material/Button";
import { useTheme, alpha } from "@mui/material/styles";

// extend MUI theme palette to include a custom "form" color
declare module "@mui/material/styles" {
  interface Palette {
    form: {
      main: string;
    };
  }

  interface PaletteOptions {
    form?: {
      main: string;
    };
  }
}

type AddTaskFormProps = {
  onAddTask(description: string, difficulty: number, priority: number): void;
};

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  // local form state
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<number>(5);
  const [priority, setPriority] = useState<number>(5);

  // handles form submission
  // prevents page reload, validates input, and calls the parent callback

  // resets form at the end
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) return;

    onAddTask(description, difficulty, priority);

    setDescription("");
    setDifficulty(5);
    setPriority(5);
  };

  const theme = useTheme();

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-4  rounded-md space-y-3"
      style={{ backgroundColor: alpha(theme.palette.background.paper, 0.5) }}
    >
      <div>
        <label
          className="block text-sm font-medium"
          style={{ color: alpha(theme.palette.form.main, 0.6) }}
        >
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            color: alpha(theme.palette.form.main, 0.6),
            backgroundColor: "transparent",
            border: `1px solid ${theme.palette.form.main}`,
            borderRadius: 6,
            padding: "8px",
            width: "100%",
            marginTop: "4px",
          }}
        />
      </div>

      <div className="flex space-x-3">
        <div className="flex-1">
          <label
            className="block text-sm font-medium "
            style={{ color: alpha(theme.palette.form.main, 0.6) }}
          >
            Difficulty (1–10)
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            style={{
              color: alpha(theme.palette.form.main, 0.6),
              backgroundColor: "transparent",
              border: `1px solid ${theme.palette.form.main}`,
              borderRadius: 6,
              padding: "8px",
              width: "100%",
              marginTop: "4px",
            }}
          />
        </div>

        <div className="flex-1">
          <label
            className="block text-sm font-medium"
            style={{ color: alpha(theme.palette.form.main, 0.6) }}
          >
            Priority (1–10)
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            style={{
              color: alpha(theme.palette.form.main, 0.6),
              backgroundColor: "transparent",
              border: `1px solid ${theme.palette.form.main}`,
              borderRadius: 6,
              padding: "8px",
              width: "100%",
              marginTop: "4px",
            }}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          sx={{
            py: 1.5,
            px: 5,
            borderRadius: 2,
            fontWeight: "bold",
            border: `1px solid ${alpha(theme.palette.form.main, 0.6)}`,
            color: alpha(theme.palette.common.white, 0.8),
            textTransform: "none",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: alpha(theme.palette.form.main, 0.1),
            },
            "& span": {
              background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          }}
        >
          <span>Add task</span>
        </Button>
      </div>
    </form>
  );
}
