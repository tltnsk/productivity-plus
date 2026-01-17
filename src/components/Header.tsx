import { useTheme, alpha } from "@mui/material/styles";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

export function Header() {
  return (
    <div className="flex justify-between">
      <Image
        src="/changed-logo.png"
        alt="Logo"
        width={150}
        height={150}
        priority
      />
      <ThemeToggle />
    </div>
  );
}
