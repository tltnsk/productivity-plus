import { useTheme, alpha } from "@mui/material/styles";
import { FaGithub } from "react-icons/fa";

export function Footer() {
  const theme = useTheme();
  return (
    <footer className="flex w-full flex-col  items-center justify-center pt-10 gap-x-12">
      <div className="flex flex-row gap-6">
        <a href="https://github.com/tltnsk" target="_blank" rel="Github link">
          <FaGithub size={20} style={{ color: theme.palette.text.secondary }} />
        </a>
        <p style={{ color: theme.palette.text.secondary }}>
          {" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
