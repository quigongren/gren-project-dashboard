// src/components/ArtifactReportTable.jsx
import React from "react";

const statusColors = {
  new: "bg-green-200 text-green-800",
  updated: "bg-yellow-200 text-yellow-800",
  deleted: "bg-red-200 text-red-800"
};

function formatRow(filePath, status) {
  const parts = filePath.split("/");
  const file = parts.pop();
  const project = parts.slice(1).join("/");
  return {
    project,
    file,
    status
  };
}

export default function ArtifactReportTable({ files }) {
  const rows = [];

  for (const status of ["new", "updated", "deleted"]) {
    (files[status] || []).forEach(filePath => {
      rows.push(formatRow(filePath, status));
    });
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Detailed Artifact Report</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Project Path</th>
              <th className="border px-4 py-2">File</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-1">{row.project}</td>
                <td className="border px-4 py-1">{row.file}</td>
                <td className={`border px-4 py-1 font-medium text-center ${statusColors[row.status]}`}>
                  {row.status.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
