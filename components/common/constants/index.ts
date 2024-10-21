export const DB_STATUS_CONSTANTS = {
  NOT_CONNECTED: "not connected",
  CONNECTED: "connected",
  ERROR: "error",
  NOT_USED: "not used",
} as const;

export const DATABASE = {
  name: "pomodoro-tasklist",
  version: 1, // IndexedDB version (integer)
  taskTable: "task-table",
};
