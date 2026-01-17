/**
 * This is a TaskList component.
 *   - container for task items
 *   - manages spacing of tasks
 *   - passes action handlers to individual tasks
 */

import { Task } from "@/lib/types";
import TaskItem from "@/components/TaskItem";
import { updateTag } from "next/cache";

// Accept Task[] as props
// Render task description in a list
type TaskListProps = {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, text: string) => void;
};

export default function TaskList({
  tasks,
  onToggleTask,
  deleteTask,
  updateTask,
}: TaskListProps) {
  return (
    <ul className="space-y-4 mt-5 py-2 px-4">
      {tasks.map((task) => (
        // unique key to distinguish each task
        <li key={task.id}>
          <TaskItem
            task={task}
            onToggleTask={onToggleTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        </li>
      ))}
    </ul>
  );
}
