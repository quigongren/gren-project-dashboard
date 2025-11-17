// src/components/PDFExportButton.jsx
import React from "react";
import html2pdf from "html2pdf.js";

export default function PDFExportButton() {
  const handleExport = () => {
    const element = document.getElementById("artifact-report");
    const opt = {
      margin:       0.5,
      filename:     "artifact_report.pdf",
      image:        { type: "jpeg", quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: "in", format: "letter", orientation: "portrait" }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleExport}
        className="px-4 py-2 rounded bg-rose-600 text-white hover:bg-rose-700"
      >
        Export Artifact Report to PDF
      </button>
    </div>
  );
}
