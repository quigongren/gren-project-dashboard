// src/App.jsx
import React, { useEffect, useState } from "react";
import { fetchSyncSummary } from "./utils/fetchSyncSummary";
import SyncSummaryCard from "./components/SyncSummaryCard";
import ProjectSyncStats from "./components/ProjectSyncStats";

function App() {
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    fetchSyncSummary().then(data => setSummaryData(data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">JFG Dashboard</h1>
      {summaryData ? (
        <>
          <SyncSummaryCard
            summary={summaryData.summary}
            timestamp={summaryData.timestamp}
          />
          <ProjectSyncStats breakdown={summaryData.project_breakdown} />
        </>
      ) : (
        <p className="text-gray-600">Loading sync summary...</p>
      )}
    </div>
  );
}

export default App;
