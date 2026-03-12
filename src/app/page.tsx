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
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import AddTaskForm from "@/components/AddTaskForm";
import ProductivityGrid from "@/components/ProductivityGrid";
import Button from "@mui/material/Button";
import { useTheme, alpha } from "@mui/material/styles";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import MindList from "@/components/Mind/MindList";
import AddItemOnMind from "@/components/Mind/AddItemOnMind";
import { ItemOnMind } from "@/lib/types";

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

export default function Home() {
  // Tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTasksLoaded, setIsTasksLoaded] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved)); // convert JSON string to JS array and store it in state
    }
    setIsTasksLoaded(true);
  }, []);

  // when tasks change, save them to localStorage (only after initial load)
  useEffect(() => {
    if (isTasksLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isTasksLoaded]);

  // ideas
  const [ideas, setIdeas] = useState<ItemOnMind[]>([]);
  const [isIdeasLoaded, setIsIdeasLoaded] = useState(false);

  // Load ideas from localStorage on mount (client-side only)
  useEffect(() => {
    const saved = localStorage.getItem("ideas");
    if (saved) {
      setIdeas(JSON.parse(saved));
    }
    setIsIdeasLoaded(true);
  }, []);

  // when ideas change, save them to localStorage (only after initial load)
  useEffect(() => {
    if (isIdeasLoaded) {
      localStorage.setItem("ideas", JSON.stringify(ideas));
    }
  }, [ideas, isIdeasLoaded]);

  // Daily history
  const [dailyHistory, setDailyHistory] = useState<DailySummary[]>([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  // load daily history
  useEffect(() => {
    const saved = localStorage.getItem("dailyHistory");
    if (saved) {
      setDailyHistory(JSON.parse(saved));
    }
    setIsHistoryLoaded(true);
  }, []);

  // save daily history to local storage
  useEffect(() => {
    if (isHistoryLoaded) {
      localStorage.setItem("dailyHistory", JSON.stringify(dailyHistory));
    }
  }, [dailyHistory, isHistoryLoaded]);

  // FORMS
  // controls when add task form is visible
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  // Controls when ideas on mind form is visible
  const [showMindItemsForm, setShowMindItemsForm] = useState(false);

  // current day in YYYY-MM-DD format (tracks when the calendar day changes)
  const [currentDateISO, setCurrentDateISO] = useState(() =>
    new Date().toLocaleDateString("sv-SE"),
  );
  const [todaysProductivity, setTodaysProductivity] = useState(0);
  const [hasEndedToday, setHasEndedToday] = useState(false);

  const endCurrentDay = () => {
    if (tasks.length === 0) return;

    const score = calculateProductivityScore(tasks);

    const summary: DailySummary = {
      id: currentDateISO,
      date: currentDateISO,
      tasks,
      productivityPercentage: score,
    };

    setDailyHistory((prev) => {
      const withoutToday = prev.filter((d) => d.date !== currentDateISO);
      return [...withoutToday, summary];
    });

    setTodaysProductivity(score);
    setHasEndedToday(true);
    setTasks([]);
  };

  // automatically finish the day when the calendar date changes (past 23:59)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nowISO = new Date().toLocaleDateString("sv-SE");
      if (nowISO !== currentDateISO) {
        if (tasks.length > 0) {
          const summary: DailySummary = {
            id: currentDateISO,
            date: currentDateISO,
            tasks,
            productivityPercentage: calculateProductivityScore(tasks),
          };

          setDailyHistory((prev) => {
            const withoutToday = prev.filter((d) => d.date !== currentDateISO);
            return [...withoutToday, summary];
          });

          setTasks([]);
        }
        setCurrentDateISO(nowISO);
        setTodaysProductivity(0);
        setHasEndedToday(false);
      }
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [currentDateISO, tasks, setDailyHistory, setTasks]);

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

  // function to edit task
  const updateTask = (taskId: string, text: string) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            description: text,
          };
        }
        return task;
      });
    });
  };

  // date shown at the top of the page
  const today = new Date(currentDateISO).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  useEffect(() => {
    const todaySummary = dailyHistory.find((d) => d.date === currentDateISO);
    if (todaySummary) {
      setTodaysProductivity(todaySummary.productivityPercentage);
      setHasEndedToday(true);
    } else {
      setHasEndedToday(false);
      setTodaysProductivity(calculateProductivityScore(tasks));
    }
  }, [dailyHistory, currentDateISO, tasks]);

  const theme = useTheme();

  // add items on mind
  const addIdea = (description: string) => {
    const newIdea: ItemOnMind = {
      id: crypto.randomUUID(),
      description: description,
      blocks: [],
    };
    setIdeas((prevIdeas) => [...prevIdeas, newIdea]);
    setShowMindItemsForm(false);
  };

  // delete idea
  const deleteIdea = (ideaId: string) => {
    setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== ideaId));
  };

  // update idea
  const updateIdea = (ideaId: string, text: string) => {
    setIdeas((prevIdeas) => {
      return prevIdeas.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            description: text,
          };
        }
        return idea;
      });
    });
  };

  return (
    <main>
      <Header />
      <div className="pl-6 pr-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold">{today}</h2>
        <p className="mt-1">Today's productivity: {todaysProductivity}%</p>

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
            updateTask={updateTask}
          ></TaskList>
          <div className="mt-4 flex justify-center">
            <Button
              sx={{
                py: 1.5,
                px: 5,
                borderRadius: 2,
                fontWeight: "bold",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.6)}`,
                color: alpha(theme.palette.common.white, 0.8),
                textTransform: "none",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.form.main, 0.1),
                },
                "& span": {
                  background: theme.palette.primary.main,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              }}
              onClick={endCurrentDay}
              className="py-2 px-10 border border-white/5 rounded-xl font-bold text-white/80 bg-white/10 hover:bg-white/15 transition-all cursor-pointer"
              disabled={tasks.length === 0}
            >
              <span className="bg-blue-500 bg-clip-text text-transparent">
                Finish Day
              </span>
            </Button>
          </div>
        </section>

        {/**Yearly grid  */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Yearly Progress</h2>
          <ProductivityGrid history={dailyHistory} />
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Ideas</h2>

          {/* add a new thought button */}
          <div className="flex justify-center w-full mt-4">
            <Button
              className="w-full py-2  transition-colors flex justify-center cursor-pointer items-center"
              sx={{
                backgroundColor: alpha(theme.palette.background.paper, 0.3),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.7),
                },
              }}
              onClick={() => setShowMindItemsForm((prev) => !prev)}
            >
              <Plus size={30} />
            </Button>
          </div>
          {showMindItemsForm && <AddItemOnMind onAddItem={addIdea} />}

          <MindList
            items={ideas}
            deleteIdea={deleteIdea}
            updateIdea={updateIdea}
          />
        </section>

        <Footer />
      </div>
    </main>
  );
}
