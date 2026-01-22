// displays heatmap of daily productivity for the last 365 days

// Pronlems with rendering
// difference between server render and first client render

"use client";

import { DailySummary } from "@/lib/types";
import { useTheme, alpha } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState, useRef } from "react";

// extend MUI theme with custom grid colors for different productivity levels
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

  // delay rendering until mounted
  // as serveral things can cause problems, mounted fixes it because:
  // server renders nothing and client first renders nothing
  // there's no mismatch to compare
  // after hydration, react renders the real grid client-side only

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate 365 days
  // format them as YYYY-MM-DD so they match date format used in DailySummary

  // _,i -> value, index. in this case initially we don't have a value
  const days = Array.from({ length: 365 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (364 - i));

    // time zone is not guaranteed to match:
    // server might be UTC, client might be local timezone
    return d.toLocaleDateString("sv-SE");
  });

  // map daily productivity array for fast lookup
  // display only date and percentage
  const historyMap = Object.fromEntries(
    history.map((h) => [h.date, h.productivityPercentage]),
  );

  // get cell color based on productivity percentage
  const getCellColor = (score: number) => {
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
    // container for productivity grid
    <div
      className="mt-4 p-4 rounded-xl"
      style={{ backgroundColor: theme.palette.background.paper }}
    >
      {/*7 rows for days of week */}
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2">
        {days.map((date, index) => {
          // get score
          const score = historyMap[date] || 0;
          // determine color based on score
          const color = getCellColor(score);

          return (
            // tooltip to get info for each day
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
              {/*single day cell  */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  backgroundColor: color,
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
