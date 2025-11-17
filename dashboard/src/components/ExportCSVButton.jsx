// src/components/ExportCSVButton.jsx
import React from "react";

export default function ExportCSVButton({ files }) {
  const exportToCSV = () => {
    let csv = "Project Path,File,Status\n";
    for (const status of ["new", "updated", "deleted"]) {
      (files[status] || []).forEach(filePath => {
        const parts = filePath.split("/");
        const file = parts.pop();
        const project = parts.slice(1).join("/");
        csv += `${project},${file},${status.toUpperCase()}\n`;
      });
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "artifact_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4">
      <button
        onClick={exportToCSV}
        className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
      >
        Export Artifact Report to CSV
      </button>
    </div>
  );
}
