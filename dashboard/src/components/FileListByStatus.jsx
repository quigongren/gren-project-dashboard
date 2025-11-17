// src/components/FileListByStatus.jsx
import React from "react";

const statusStyles = {
  new: "text-green-600",
  updated: "text-yellow-600",
  deleted: "text-red-600",
};

const statusLabels = {
  new: "🟢 New Files",
  updated: "🟡 Updated Files",
  deleted: "🔴 Deleted Files",
};

export default function FileListByStatus({ files }) {
  return (
    <div className="mt-6 space-y-4">
      {["new", "updated", "deleted"].map((status) => (
        <div key={status}>
          <h3 className={`text-lg font-semibold ${statusStyles[status]}`}>
            {statusLabels[status]}
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-300 ml-4">
            {files[status] && files[status].length > 0 ? (
              files[status].map((file, idx) => (
                <li key={idx} className="truncate">{file}</li>
              ))
            ) : (
              <li className="italic text-gray-500">No files</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
