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

function App() {
  const [summaryData, setSummaryData] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [filters, setFilters] = useState({ status: "", project: "" });

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

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 print:text-black print:bg-white">
      <h1 className="text-3xl font-bold print:text-black">JFG Dashboard</h1>
      {summaryData ? (
        <>
          <SyncSummaryCard summary={summaryData.summary} timestamp={summaryData.timestamp} />
          <ProjectSyncStats breakdown={summaryData.project_breakdown} />
          <FileListByStatus files={summaryData.files} />
          <SyncTimelineChart timelineData={timelineData} />
          <ZipExportButton files={summaryData.files} />
          <ReportBundleButton files={summaryData.files} />
          <FilterControls filters={filters} setFilters={setFilters} projects={allProjects} />
          <ArtifactReportTable files={summaryData.files} filters={filters} />
          <ExportCSVButton files={summaryData.files} />
        </>
      ) : (
        <p className="text-gray-600">Loading sync summary...</p>
      )}
    </div>
  );
}

export default App;
