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

export default function ArtifactReportTable({ files, filters }) {
  const rows = [];

  for (const status of ["new", "updated", "deleted"]) {
    (files[status] || []).forEach(filePath => {
      const row = formatRow(filePath, status);
      rows.push(row);
    });
  }

  const filtered = rows.filter(row => {
    const statusMatch = !filters.status || row.status === filters.status;
    const projectMatch = !filters.project || row.project === filters.project;
    return statusMatch && projectMatch;
  });

  return (
    <div className="mt-6 print:block">
      <h3 className="text-lg font-semibold mb-2">Detailed Artifact Report</h3>
      <div className="overflow-x-auto print:overflow-visible">
        <table className="min-w-full table-auto border-collapse text-sm print:text-xs print:border">
          <thead className="bg-gray-100 print:bg-white">
            <tr>
              <th className="border px-4 py-2">Project Path</th>
              <th className="border px-4 py-2">File</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx} className="print:text-black">
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
