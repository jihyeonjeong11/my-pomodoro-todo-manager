import { type StatusType } from "@/types/dbLocal";
import createFastContext from "components/contexts/createFastContext";

export const {
  FastContextProvider: IndexedDBProvider,
  useFastContextFields: useIndexedDB,
} = createFastContext({
  status: "not connected" as StatusType,
  db: null as IDBDatabase | null,
});
