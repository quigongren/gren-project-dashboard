// src/components/AutoExportTrigger.jsx
import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";

export default function AutoExportTrigger({ enabled = true }) {
  useEffect(() => {
    if (!enabled) return;

    const lastExport = localStorage.getItem("lastExportDate");
    const now = new Date();
    const last = lastExport ? new Date(lastExport) : null;

    const shouldExport = !last || (now - last) > 7 * 24 * 60 * 60 * 1000;

    if (shouldExport) {
      const element = document.getElementById("artifact-report");
      if (element) {
        html2pdf()
          .from(element)
          .set({
            margin: 0.5,
            filename: "weekly_auto_report.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
          })
          .save()
          .then(() => {
            localStorage.setItem("lastExportDate", now.toISOString());
            console.log("✅ Weekly report auto-exported.");
          });
      }
    }
  }, [enabled]);

  return null;
}
