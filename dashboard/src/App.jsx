// src/App.jsx
import React, { useEffect, useState } from "react";
import { fetchSyncSummary } from "./utils/fetchSyncSummary";
import SyncSummaryCard from "./components/SyncSummaryCard";
import ProjectSyncStats from "./components/ProjectSyncStats";
import FileListByStatus from "./components/FileListByStatus";
import SyncTimelineChart from "./components/SyncTimelineChart";
import ZipExportButton from "./components/ZipExportButton";
import ArtifactReportTable from "./components/ArtifactReportTable";
import ExportCSVButton from "./components/ExportCSVButton";
import FilterControls from "./components/FilterControls";
import ReportBundleButton from "./components/ReportBundleButton";
import DateRangePicker from "./components/DateRangePicker";
import PDFExportButton from "./components/PDFExportButton";
import PresetRanges from "./components/PresetRanges";
import AutoExportTrigger from "./components/AutoExportTrigger";
import ProjectSummaries from "./components/ProjectSummaries";
import FilePreviewModal from "./components/FilePreviewModal";

function App() {
  const [summaryData, setSummaryData] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [filters, setFilters] = useState({ status: "", project: "" });
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [previewPath, setPreviewPath] = useState("");

  useEffect(() => {
    fetchSyncSummary().then(data => setSummaryData(data));
    fetch("/drive_sync/sync_timeline.json")
      .then(res => res.json())
      .then(data => setTimelineData(data));
  }, []);

  const allProjects = summaryData
    ? Array.from(new Set(
        ["new", "updated", "deleted"].flatMap(type =>
          (summaryData.files[type] || []).map(path => path.split("/").slice(1, -1).join("/"))
        )
      ))
    : [];

  const filteredTimeline = timelineData.filter(entry => {
    const date = entry.date;
    return (!dateRange.start || date >= dateRange.start) &&
           (!dateRange.end || date <= dateRange.end);
  });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 print:text-black print:bg-white">
      <h1 className="text-3xl font-bold print:text-black">JFG Dashboard</h1>
      {summaryData ? (
        <>
          <SyncSummaryCard summary={summaryData.summary} timestamp={summaryData.timestamp} />
          <ProjectSyncStats breakdown={summaryData.project_breakdown} />
          <ProjectSummaries files={summaryData.files} />
          <FileListByStatus files={summaryData.files} />
          <PresetRanges setDateRange={setDateRange} />
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <SyncTimelineChart timelineData={filteredTimeline} />
          <ZipExportButton files={summaryData.files} />
          <ReportBundleButton files={summaryData.files} />
          <FilterControls filters={filters} setFilters={setFilters} projects={allProjects} />
          <div id="artifact-report">
            <ArtifactReportTable files={summaryData.files} filters={filters} onPreview={setPreviewPath} />
          </div>
          <PDFExportButton />
          <ExportCSVButton files={summaryData.files} />
          <AutoExportTrigger />
          <FilePreviewModal filePath={previewPath} onClose={() => setPreviewPath("")} />
        </>
      ) : (
        <p className="text-gray-600">Loading sync summary...</p>
      )}
    </div>
  );
}

export default App;
