import { Task } from "@/lib/types";

// Accept Task[] as props
// Render task description in a list

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.description}</li>
      ))}
    </ul>
  );
}
