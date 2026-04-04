/**
 * Upload targets — `usesApi` means the file is posted to the backend today;
 * others are marked session-only until APIs exist.
 */
export const UPLOAD_SLOTS = [
  {
    id: "sales",
    label: "Sales data",
    description: "Line-level sales from POS or your daily export.",
    hint: "We match sold quantities to stock movement. Use your standard column layout.",
    accept: ".csv,.xlsx",
    inputAccept: ".csv,.xlsx",
    acceptDisplay: "CSV or Excel (.xlsx)",
    usesApi: true,
  },
  {
    id: "nc",
    label: "NC (non-chargeable)",
    description: "Complimentary or staff pours not billed as sales.",
    hint: "Excel only for live import. Include the same date range as sales.",
    accept: ".csv,.xlsx",
    inputAccept: ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    acceptDisplay: "Excel (.xlsx) for import",
    usesApi: true,
  },
  {
    id: "deletedKot",
    label: "Deleted KOT",
    description: "Kitchen tickets removed after printing.",
    hint: "Helps explain stock that left the kitchen without a final bill.",
    accept: ".csv,.xlsx",
    inputAccept: ".csv,.xlsx",
    acceptDisplay: "CSV or Excel (.xlsx)",
    usesApi: false,
  },
  {
    id: "cancelled",
    label: "Cancelled bills",
    description: "Bills voided or cancelled in the POS.",
    hint: "Separates real consumption from reversed transactions.",
    accept: ".csv,.xlsx",
    inputAccept: ".csv,.xlsx",
    acceptDisplay: "CSV or Excel (.xlsx)",
    usesApi: false,
  },
  {
    id: "purchase",
    label: "Purchase data",
    description: "Goods received and purchase invoices.",
    hint: "Closing stock math includes what you bought in the period.",
    accept: ".csv,.xlsx",
    inputAccept: ".csv,.xlsx",
    acceptDisplay: "CSV or Excel (.xlsx)",
    usesApi: false,
  },
] as const;

export type UploadSlot = (typeof UPLOAD_SLOTS)[number];
export type UploadSlotId = UploadSlot["id"];
