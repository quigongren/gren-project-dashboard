// src/components/SyncSummaryCard.jsx
import React from "react";

export default function SyncSummaryCard({ summary, timestamp }) {
  const formattedTime = new Date(timestamp).toLocaleString();
  return (
    <div className="p-4 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">Latest Sync Summary</h2>
      <p className="text-gray-700">{summary}</p>
      <p className="text-sm text-gray-500 mt-2">Last updated: {formattedTime}</p>
    </div>
  );
}
