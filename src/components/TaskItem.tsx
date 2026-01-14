/*
This is a TaskItem component
Renders an individual task row
Has tasks completion toggling and deletion of tasks 
 */

import { Task } from "@/lib/types";
import { Trash } from "lucide-react";
import { useTheme, alpha } from "@mui/material/styles";

type TaskItemProps = {
  task: Task;
  onToggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
};

export default function TaskItem({
  task,
  onToggleTask,
  deleteTask,
}: TaskItemProps) {
  const theme = useTheme();
  return (
    <div
      className="group flex justify-between items-center space-x-3.5 space-y-4 bg-neutral-primary-soft border rounded-sm rounded-base shadow-xs transition-colors duration-150"
      style={{ borderColor: alpha(theme.palette.text.secondary, 1) }}
    >
      <label className="p-1">
        <div
          className="w-full text-sm font-medium mt-4"
          style={{ color: alpha(theme.palette.text.secondary, 1) }}
        >
          <div
            className={task.completion === "completed" ? "line-through" : ""}
            style={{
              color:
                task.completion === "completed"
                  ? alpha(theme.palette.text.secondary, 0.6)
                  : theme.palette.text.secondary,
              transition: "color 0.2s",
            }}
          >
            {task.description}
          </div>
          <div className="flex justify-between space-x-2 items-center h-0 overflow-hidden group-hover:h-auto opacity-100 transition-all duration-200">
            <span>Difficulty: {task.difficulty}</span>
            <span>Priority: {task.priority}</span>
          </div>
        </div>
      </label>
      <div>
        <input
          type="checkbox"
          value=""
          name="bordered-checkbox"
          className="w-4 h-4 me-4 border border-default-medium rounded-xs focus:ring-2 focus:ring-brand-soft"
          style={{
            accentColor: alpha(theme.palette.text.secondary, 1),
          }}
          onChange={() => onToggleTask(task.id)}
        ></input>
        <button>
          <Trash
            className="cursor-pointer mr-2"
            size={20}
            strokeWidth={1}
            onClick={() => deleteTask(task.id)}
          />
        </button>
      </div>
    </div>
  );
}
