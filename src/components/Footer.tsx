import { useTheme, alpha } from "@mui/material/styles";
import { FaGithub } from "react-icons/fa";

export function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <footer className="flex w-full flex-col  items-center justify-center pt-10 gap-x-12">
      <div className="flex flex-row gap-6">
        <a href="https://github.com/tltnsk" target="_blank" rel="Github link">
          <FaGithub size={20} style={{ color: "#1b3ff2" }} />
        </a>
        <p style={{ color: "#1b3ff2" }}> {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
