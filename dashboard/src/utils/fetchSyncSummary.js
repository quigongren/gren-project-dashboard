// src/utils/fetchSyncSummary.js
export async function fetchSyncSummary() {
  try {
    const response = await fetch("/drive_sync/sync_summary.json");
    if (!response.ok) throw new Error("Failed to load sync summary");
    return await response.json();
  } catch (error) {
    console.error("Error fetching sync summary:", error);
    return null;
  }
}
