"use client";

import { Task } from "@/lib/types";
import TaskList from "@/components/TaskList";
import { calculateProductivityScore } from "@/lib/scores";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddTaskForm from "@/components/AddTaskForm";

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

  const [tasks, setTasks] = useState<Task[]>([task1, task2]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  // function to toggle task's completion
  const toggleTask = (taskId: string) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completion:
              task.completion === "completed" ? "not_completed" : "completed",
          };
        }
        return task;
      });
    });
  };

  // function to add task
  const addTask = (
    description: string,
    difficulty: number,
    priority: number
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      description: description,
      difficulty: difficulty,
      priority: priority,
      completion: "not_completed",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowAddTaskForm(false);
  };

  // function to delete task
  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Today</h1>
      <p>Productivity: {calculateProductivityScore(tasks)}%</p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <div className="flex justify-center w-full mt-4">
          <button
            className="px-16 py-2 rounded-full border border-gray-600 flex justify-center cursor-pointer"
            onClick={() => setShowAddTaskForm((prev) => !prev)}
          >
            <Plus size={30} />
          </button>
        </div>
        {showAddTaskForm && <AddTaskForm onAddTask={addTask} />}

        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          deleteTask={deleteTask}
        ></TaskList>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Yearly Progress</h2>
      </section>
    </main>
  );
}
