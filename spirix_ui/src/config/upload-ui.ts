/** Copy for the data uploads area — keeps labels consistent and easy to translate. */

export const uploadPage = {
  title: "Data uploads",
  subtitle:
    "Add the files your reports depend on. Each box explains what to upload and which format we accept.",
  centerTitle: "Upload center",
  centerLead:
    "Drag a file onto a card or click the card to browse. Sales and NC files are sent to the server; other files are kept in this browser session until upload is enabled.",
  uploadedLabel: "Files on record",
  processCta: "Go to dashboard",
  processHint: "Review variance and charts with the latest uploads.",
} as const;

/** Shown at the top of the uploads page so users know the flow. */
export const uploadSteps = [
  {
    title: "Pick each file type",
    body: "Match your export to the label on the card — sales, NC, purchases, and voids.",
  },
  {
    title: "Drag, drop, or click",
    body: "One file per box. Server import runs for Sales and NC; other boxes stay in-session for now.",
  },
  {
    title: "Review on the dashboard",
    body: "When every box is filled, open the dashboard for variance and leakage views.",
  },
] as const;

export const uploadAlerts = {
  incompleteTitle: "Some files are still missing",
  incompleteBody:
    "Upload every source below so leakage and variance numbers stay trustworthy.",
  allReadyTitle: "All sources uploaded",
  allReadyBody: "You can open the dashboard to explore trends and alerts.",
} as const;
