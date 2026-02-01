// wraps entire app with MUI theme
// saves selected theme in localStorage

"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createAppTheme } from "@/theme/index";
import { PaletteMode } from "@mui/material";
import { ThemeModeContext } from "./ThemeContext";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>("dark");
  // read user's saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    }
  }, []);

  // build theme object whenever mode changes
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  // switch between light and dark mode
  // save new value in localStorage (stable reference to avoid context consumer re-renders)
  const toggle = useCallback(() => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      return next;
    });
  }, []);

  const contextValue = useMemo(() => ({ mode, toggle }), [mode, toggle]);

  return (
    // theme mode and toggle function for the entire app
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        {/** set style based on theme  */}
        <CssBaseline />
        {/*render rest of app */}
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
