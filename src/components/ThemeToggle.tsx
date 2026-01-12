import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeMode } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { mode, toggle } = useThemeMode();
  return (
    <IconButton onClick={toggle} color="inherit">
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
