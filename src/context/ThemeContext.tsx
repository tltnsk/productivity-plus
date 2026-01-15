// provides global access to current MUI color mode
// has a toggle function

"use client";

import { createContext, useContext } from "react";
import { PaletteMode } from "@mui/material";

// contains current mode and toggle function to switch modes
export const ThemeModeContext = createContext<{
  mode: PaletteMode;
  toggle: () => void;
}>({
  // default values
  mode: "dark",
  toggle: () => {},
});

// hook to access current theme mode and the function to toggle it
export const useThemeMode = () => useContext(ThemeModeContext);
