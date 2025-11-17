// src/components/ZipExportButton.jsx
import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function ZipExportButton({ files }) {
  const handleZipDownload = async () => {
    const zip = new JSZip();
    for (const status in files) {
      files[status].forEach((filePath) => {
        zip.file(filePath.split("/").pop(), `Fake content for ${filePath}`);
      });
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "dashboard_export.zip");
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleZipDownload}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Download All Synced Files as ZIP
      </button>
    </div>
  );
}
