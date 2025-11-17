// src/components/ReportBundleButton.jsx
import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function ReportBundleButton({ files }) {
  const handleBundleDownload = async () => {
    const zip = new JSZip();
    let csv = "Project Path,File,Status\n";

    for (const status of ["new", "updated", "deleted"]) {
      (files[status] || []).forEach(filePath => {
        const parts = filePath.split("/");
        const file = parts.pop();
        const project = parts.slice(1).join("/");
        zip.file(file, `Fake content for ${filePath}`);
        csv += `${project},${file},${status.toUpperCase()}\n`;
      });
    }

    zip.file("artifact_report.csv", csv);
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "weekly_or_monthly_bundle.zip");
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleBundleDownload}
        className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
      >
        Generate & Download Weekly/Monthly Report Bundle
      </button>
    </div>
  );
}
