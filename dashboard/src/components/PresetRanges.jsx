// src/components/PresetRanges.jsx
import React from "react";
import { subDays, startOfMonth, format } from "date-fns";

export default function PresetRanges({ setDateRange }) {
  const today = format(new Date(), "yyyy-MM-dd");

  const presets = {
    "Today": { start: today, end: today },
    "Last 7 Days": {
      start: format(subDays(new Date(), 6), "yyyy-MM-dd"),
      end: today
    },
    "This Month": {
      start: format(startOfMonth(new Date()), "yyyy-MM-dd"),
      end: today
    },
    "All Time": { start: "", end: "" }
  };

  return (
    <div className="flex gap-2 flex-wrap mb-2">
      {Object.entries(presets).map(([label, range]) => (
        <button
          key={label}
          onClick={() => setDateRange(range)}
          className="px-3 py-1 bg-slate-100 text-sm rounded hover:bg-slate-200"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
