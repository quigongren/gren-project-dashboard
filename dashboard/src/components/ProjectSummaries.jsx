// src/components/ProjectSummaries.jsx
import React from "react";

export default function ProjectSummaries({ files }) {
  const projectStats = {};

  ["new", "updated", "deleted"].forEach(status => {
    (files[status] || []).forEach(file => {
      const project = file.split("/")[1];  // assumes /drive_sync/project_name/file
      if (!projectStats[project]) {
        projectStats[project] = { new: 0, updated: 0, deleted: 0 };
      }
      projectStats[project][status]++;
    });
  });

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Project Summaries</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(projectStats).map(([project, stats]) => (
          <div key={project} className="border rounded p-4 shadow bg-white space-y-2">
            <h4 className="text-xl font-bold">{project}</h4>
            <p><span className="text-green-600 font-medium">New:</span> {stats.new}</p>
            <p><span className="text-yellow-600 font-medium">Updated:</span> {stats.updated}</p>
            <p><span className="text-red-600 font-medium">Deleted:</span> {stats.deleted}</p>
            <p className="text-sm text-gray-500">Total: {stats.new + stats.updated + stats.deleted}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
