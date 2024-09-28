import { type DB_STATUS_CONSTANTS } from "@/components/common/constants";

export type StatusType =
  (typeof DB_STATUS_CONSTANTS)[keyof typeof DB_STATUS_CONSTANTS];

export type DBType = {
  db: any;
  status: (typeof DB_STATUS_CONSTANTS)[keyof typeof DB_STATUS_CONSTANTS];
};
