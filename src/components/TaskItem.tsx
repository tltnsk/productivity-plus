import { Task } from "@/lib/types";

type TaskItemProps = {
  task: Task;
  onToggleTask: (taskId: string) => void;
};

export default function TaskItem({ task, onToggleTask }: TaskItemProps) {
  return (
    <div className="flex justify-between space-x-3.5 space-y-4 bg-neutral-primary-soft border rounded-sm border-gray-600 rounded-base shadow-xs">
      <label className="p-1">
        <p className="w-full text-sm font-medium text-heading mt-4">
          {task.description}
        </p>
      </label>
      <input
        type="checkbox"
        value=""
        name="bordered-checkbox"
        className="w-4 h-4 mt-5 me-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
        onChange={() => onToggleTask(task.id)}
      ></input>
    </div>
  );
}
