export const STATUS_CONSTANTS = {
  NOT_CONNECTED: "not connected",
  CONNECTED: "connected",
  ERROR: "error",
  UNUSED: "unused",
} as const;

export type StatusType = keyof typeof STATUS_CONSTANTS;

export type DBType = {
  db: any;
  status: (typeof STATUS_CONSTANTS)[keyof typeof STATUS_CONSTANTS];
};
