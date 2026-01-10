import { DailySummary } from "@/lib/types";

type ProductivityGridProps = {
  history: DailySummary[];
};

export default function ProductivityGrid({ history }: ProductivityGridProps) {
  const days = Array.from({ length: 365 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (364 - i));
    return d.toLocaleDateString().slice(0, 10);
  });
  return (
    <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl">
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2">
        {days.map((date, index) => {
          // 2. Find if we have history for this specific date
          const historyMap = Object.fromEntries(
            history.map((h) => [h.date, h.productivityPercentage])
          );

          const score = historyMap[date] || 0;

          // 3. Determine color based on score
          let colorClass = "bg-slate-100"; // Default empty
          if (score > 0) colorClass = "bg-green-100";
          if (score > 30) colorClass = "bg-green-300";
          if (score > 60) colorClass = "bg-green-500";
          if (score > 85) colorClass = "bg-green-700";

          return (
            <div
              key={date + index}
              title={`${date}: ${score}%`}
              className={`w-3 h-3 rounded-xs ${colorClass} transition-colors`}
            />
          );
        })}
      </div>
      <p className="text-[10px] text-slate-400 mt-2 text-right">
        Last 365 days
      </p>
    </div>
  );
}
