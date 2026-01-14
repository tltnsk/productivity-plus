import { DailySummary } from "@/lib/types";
import { useTheme, alpha } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

declare module "@mui/material/styles" {
  interface Palette {
    grid: {
      twenty: string;
      forty: string;
      sixty: string;
      eighty: string;
      hundred: string;
    };
  }

  interface PaletteOptions {
    grid?: {
      twenty: string;
      forty: string;
      sixty: string;
      eighty: string;
      hundred: string;
    };
  }
}

type ProductivityGridProps = {
  history: DailySummary[];
};

export default function ProductivityGrid({ history }: ProductivityGridProps) {
  const theme = useTheme();

  // Generate 365b days
  const days = Array.from({ length: 365 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (364 - i));
    return d.toLocaleDateString("sv-SE");
  });

  // map history for fast lookup
  const historyMap = Object.fromEntries(
    history.map((h) => [h.date, h.productivityPercentage])
  );

  const getCellColor = (score: number) => {
    const base =
      theme.palette.mode === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.main;

    if (score === 0) {
      return theme.palette.mode === "dark"
        ? alpha(theme.palette.grey[800], 0.3)
        : alpha(theme.palette.grey[300], 0.3);
    }
    if (score <= 20) return alpha(theme.palette.grid.twenty, 1);
    if (score <= 40) return alpha(theme.palette.grid.forty, 1);
    if (score <= 60) return alpha(theme.palette.grid.sixty, 1);
    if (score <= 80) return alpha(theme.palette.grid.eighty, 1);
    return theme.palette.grid.hundred;
  };

  return (
    <div
      className="mt-4 p-4 rounded-xl"
      style={{ backgroundColor: theme.palette.background.paper }}
    >
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2">
        {days.map((date, index) => {
          const score = historyMap[date] || 0;
          const color = getCellColor(score);

          return (
            <Tooltip
              key={date + index}
              title={
                <div style={{ fontSize: 12 }}>
                  <div>{date}</div>
                  <div style={{ fontWeight: 600 }}>{score}%</div>
                </div>
              }
              arrow
              placement="top"
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  backgroundColor: color,
                  transition: "background-color 0.2s",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
