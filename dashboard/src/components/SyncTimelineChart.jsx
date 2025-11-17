// src/components/SyncTimelineChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function SyncTimelineChart({ timelineData }) {
  const labels = timelineData.map(entry => entry.date);
  const data = {
    labels,
    datasets: [
      {
        label: "New",
        data: timelineData.map(entry => entry.new),
        backgroundColor: "rgba(34,197,94,0.7)"
      },
      {
        label: "Updated",
        data: timelineData.map(entry => entry.updated),
        backgroundColor: "rgba(234,179,8,0.7)"
      },
      {
        label: "Deleted",
        data: timelineData.map(entry => entry.deleted),
        backgroundColor: "rgba(239,68,68,0.7)"
      }
    ]
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Sync Timeline</h3>
      <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
}
