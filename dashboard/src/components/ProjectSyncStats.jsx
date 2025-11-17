// src/components/ProjectSyncStats.jsx
import React from "react";

export default function ProjectSyncStats({ breakdown }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Project Sync Breakdown</h3>
      <table className="min-w-full text-left table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Project</th>
            <th className="border px-4 py-2">New</th>
            <th className="border px-4 py-2">Updated</th>
            <th className="border px-4 py-2">Deleted</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(breakdown).map(([project, stats]) => (
            <tr key={project}>
              <td className="border px-4 py-2 font-medium">{project}</td>
              <td className="border px-4 py-2">{stats.new}</td>
              <td className="border px-4 py-2">{stats.updated}</td>
              <td className="border px-4 py-2">{stats.deleted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
