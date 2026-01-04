import { Task } from "@/lib/types";
import TaskList from "@/components/TaskList";
import { calculateProductivityScore } from "@/lib/scores";
export default function Home() {
  const task1: Task = {
    id: "1",
    description: "Do homework",
    difficulty: 5,
    priority: 5,
    completion: "not_completed",
  };

  const task2: Task = {
    id: "2",
    description: "Clean House",
    difficulty: 7,
    priority: 10,
    completion: "not_completed",
  };

  const tasks: Task[] = [task1, task2];

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Today</h1>
      <p>Productivity: {calculateProductivityScore(tasks)}%</p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <TaskList tasks={tasks}></TaskList>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Yearly Progress</h2>
      </section>
    </main>
  );
}
