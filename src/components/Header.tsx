import { useTheme, alpha } from "@mui/material/styles";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

export function Header() {
  return (
    <div className="flex justify-between">
      <Image src="/logo.png" alt="Logo" width={100} height={100} priority />
      <ThemeToggle />
    </div>
  );
}
