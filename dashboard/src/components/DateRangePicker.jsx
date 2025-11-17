// src/components/DateRangePicker.jsx
import React from "react";

export default function DateRangePicker({ dateRange, setDateRange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex gap-4 items-center mb-4">
      <label className="font-medium">Date Range:</label>
      <input
        type="date"
        name="start"
        value={dateRange.start}
        onChange={handleChange}
        className="border rounded p-1"
      />
      <span>to</span>
      <input
        type="date"
        name="end"
        value={dateRange.end}
        onChange={handleChange}
        className="border rounded p-1"
      />
    </div>
  );
}
