import { Task } from "@/lib/types";
import { Trash } from "lucide-react";

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
  return (
    <div className="group flex justify-between items-center space-x-3.5 space-y-4 bg-neutral-primary-soft border rounded-sm border-gray-600 rounded-base shadow-xs  hover:bg-gray-100 transition-colors duration-150">
      <label className="p-1">
        <div className="w-full text-sm font-medium mt-4">
          <div
            className={`${
              task.completion === "completed"
                ? "line-through text-gray-400"
                : ""
            }`}
          >
            {task.description}
          </div>
          <div className="flex justify-between space-x-2 items-center opacity-0 h-0 overflow-hidden group-hover:h-auto opacity-100 transition-all duration-200">
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
          className="w-4 h-4 me-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
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
