"use client";

import { Task } from "@/lib/types";
import { DailySummary } from "@/lib/types";
import TaskList from "@/components/TaskList";
import { calculateProductivityScore } from "@/lib/scores";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddTaskForm from "@/components/AddTaskForm";
import { useEffect } from "react";
import ProductivityGrid from "@/components/ProductivityGrid";

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

  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks([task1, task2]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [dailyHistory, setDailyHistory] = useState<DailySummary[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("dailyHistory");

    if (saved) {
      setDailyHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dailyHistory", JSON.stringify(dailyHistory));
  }, [dailyHistory]);

  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const todaySummary: DailySummary = {
    id: crypto.randomUUID(),
    date: new Date().toLocaleDateString().slice(0, 10),
    tasks: tasks,
    productivityPercentage: calculateProductivityScore(tasks),
  };

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

  // finish day
  const finishDay = () => {
    setDailyHistory((prev) => [...prev, todaySummary]);
    setTasks([]);
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
        <div className="flex justify-center ">
          <button
            onClick={finishDay}
            className="px-16 py-2 rounded-full border border-gray-600 flex justify-center cursor-pointer"
          >
            Finish Day
          </button>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Yearly Progress</h2>
        <ProductivityGrid history={dailyHistory} />
      </section>
    </main>
  );
}
