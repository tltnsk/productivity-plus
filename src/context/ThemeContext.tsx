"use client";

import { createContext, useContext } from "react";
import { PaletteMode } from "@mui/material";

export const ThemeModeContext = createContext<{
  mode: PaletteMode;
  toggle: () => void;
}>({
  mode: "dark",
  toggle: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);
