import { Task } from "@/lib/types";
import TaskItem from "@/components/TaskItem";
// Accept Task[] as props
// Render task description in a list

type TaskListProps = {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
};

export default function TaskList({
  tasks,
  onToggleTask,
  deleteTask,
}: TaskListProps) {
  return (
    <ul className="space-y-4 mt-5 py-2 px-4">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onToggleTask={onToggleTask}
            deleteTask={deleteTask}
          />
        </li>
      ))}
    </ul>
  );
}
