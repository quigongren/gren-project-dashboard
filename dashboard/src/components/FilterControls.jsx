// src/components/FilterControls.jsx
import React from "react";

export default function FilterControls({ filters, setFilters, projects }) {
  const handleStatusChange = (e) => {
    setFilters(prev => ({ ...prev, status: e.target.value }));
  };

  const handleProjectChange = (e) => {
    setFilters(prev => ({ ...prev, project: e.target.value }));
  };

  return (
    <div className="flex gap-4 flex-wrap mb-4 items-center">
      <div>
        <label className="mr-2 font-medium">Status:</label>
        <select value={filters.status} onChange={handleStatusChange} className="p-1 border rounded">
          <option value="">All</option>
          <option value="new">New</option>
          <option value="updated">Updated</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>
      <div>
        <label className="mr-2 font-medium">Project:</label>
        <select value={filters.project} onChange={handleProjectChange} className="p-1 border rounded">
          <option value="">All</option>
          {projects.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
