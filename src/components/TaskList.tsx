import { Task } from "@/lib/types";
import TaskItem from "@/components/TaskItem";
// Accept Task[] as props
// Render task description in a list

type TaskListProps = {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
};

export default function TaskList({ tasks, onToggleTask }: TaskListProps) {
  return (
    <ul className="space-y-4 mt-5 ml-8">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} onToggleTask={onToggleTask} />
        </li>
      ))}
    </ul>
  );
}
