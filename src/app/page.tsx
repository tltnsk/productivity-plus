// main screen of the app

// stores all active tasks and daily productivity historu
// calculates productivity
// saves everything to local storage
// renders grid

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
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import Button from "@mui/material/Button";
import { useTheme, alpha } from "@mui/material/styles";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

declare module "@mui/material/styles" {
  interface Palette {
    form: {
      main: string;
    };
  }

  interface PaletteOptions {
    form?: {
      main: string;
    };
  }
}

// default demo tasks
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

  // stores all active tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // load tasks from storage or use demo tasks if none exist
  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks([task1, task2]);
    }
  }, []);

  // when tasks change, save them to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // store productivity summary for each day
  const [dailyHistory, setDailyHistory] = useState<DailySummary[]>([]);

  // load saved history
  useEffect(() => {
    const saved = localStorage.getItem("dailyHistory");

    if (saved) {
      setDailyHistory(JSON.parse(saved));
    }
  }, []);

  // save history whenever it changes
  useEffect(() => {
    localStorage.setItem("dailyHistory", JSON.stringify(dailyHistory));
  }, [dailyHistory]);

  // controls when add task form is visible
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  // date in YYYY-MM-DD format
  const todayISO = new Date().toLocaleDateString("sv-SE");

  // called when user clicks finish day button
  // it calculates productivity, saves today into history and clears tasks
  const finishDay = () => {
    const summary: DailySummary = {
      id: todayISO,
      date: todayISO,
      tasks,
      productivityPercentage: calculateProductivityScore(tasks),
    };

    setDailyHistory((prev) => {
      // remove any old entry for today (if user clicks twice)
      const withoutToday = prev.filter((d) => d.date !== todayISO);
      return [...withoutToday, summary];
    });

    setTasks([]);
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
    priority: number,
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

  // date shown at the top of the page
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const theme = useTheme();

  return (
    <main>
      <Header />
      <div className="pl-6 pr-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold">{today}</h2>
        <p>Today's Productivity: {calculateProductivityScore(tasks)}%</p>

        {/* task section */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <div className="flex justify-center w-full mt-4">
            <Button
              className="w-full py-2  transition-colors flex justify-center cursor-pointer items-center"
              sx={{
                backgroundColor: alpha(theme.palette.background.paper, 0.3),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                },
              }}
              onClick={() => setShowAddTaskForm((prev) => !prev)}
            >
              <Plus size={30} />
            </Button>
          </div>

          {/* add task form */}
          {showAddTaskForm && <AddTaskForm onAddTask={addTask} />}

          {/*task list */}
          <TaskList
            tasks={tasks}
            onToggleTask={toggleTask}
            deleteTask={deleteTask}
          ></TaskList>

          {/*Finish day */}
          <div className="flex justify-center ">
            <Button
              onClick={finishDay}
              type="submit"
              sx={{
                px: 5,
                py: 1.5,
                border: `2px solid ${alpha(theme.palette.form.main, 0.5)}`,
                borderRadius: 3,
                fontWeight: "bold",
                fontSize: 15,
                textTransform: "none",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.form.main, 0.05),
                },
                "& span": {
                  background: `linear-gradient(to top left, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              }}
              disabled={showAddTaskForm}
            >
              <span>Finish Day</span>
            </Button>
          </div>
        </section>

        {/**Yearly grid  */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Yearly Progress</h2>
          <ProductivityGrid history={dailyHistory} />
        </section>

        <Footer />
      </div>
    </main>
  );
}
