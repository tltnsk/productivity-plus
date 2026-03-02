import { useState } from "react";
import Button from "@mui/material/Button";
import { useTheme, alpha } from "@mui/material/styles";
import { on } from "events";

type AddItemOnMindProps = {
  onAddItem(description: string): void;
};

export default function AddItemOnMind({ onAddItem }: AddItemOnMindProps) {
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onAddItem(description);

    setDescription("");
  };

  const theme = useTheme();

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-4  rounded-md space-y-3"
      style={{ backgroundColor: alpha(theme.palette.background.paper, 0.5) }}
    >
      {/** enter description form  */}
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
            border: `1px solid ${alpha(theme.palette.form.main, 0.2)}`,
            borderRadius: 6,
            padding: "8px",
            width: "100%",
            marginTop: "4px",
          }}
        ></input>
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          sx={{
            py: 1.5,
            px: 5,
            borderRadius: 2,
            fontWeight: "bold",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.6)}`,
            color: alpha(theme.palette.common.white, 0.8),
            textTransform: "none",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: alpha(theme.palette.form.main, 0.1),
            },
            "& span": {
              background: theme.palette.primary.main,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          }}
        >
          <span> Add</span>
        </Button>
      </div>
    </form>
  );
}
