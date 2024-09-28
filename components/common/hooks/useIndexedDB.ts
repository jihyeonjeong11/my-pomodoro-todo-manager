import { useEffect } from "react";
import { isIndexedDBExists } from "@/components/common/hooks/functions";
import { DB_STATUS_CONSTANTS } from "@/components/common/constants";
import { type StatusType } from "@/types/dbLocal";
import { TaskType } from "@/types/TaskList";

const DATABASE = {
  name: "pomodoro-tasklist",
  version: 1,
};

const useIndexedDBConnection = (
  getStatus: StatusType,
  setStatus: (value: StatusType) => void,
  getDB: IDBDatabase | null,
  setDB: (value: IDBDatabase | null) => void
) => {
  useEffect(() => {
    const openDB = async () => {
      if (
        isIndexedDBExists() &&
        process.env.NEXT_PUBLIC_IS_LOCAL === "true" &&
        !getDB
      ) {
        setStatus(DB_STATUS_CONSTANTS.NOT_CONNECTED);
        await new Promise((resolve) => {
          const request = indexedDB.open(DATABASE.name, DATABASE.version);

          request.onupgradeneeded = (event) => {
            const db = event.target?.result;

            if (!db.objectStoreNames.contains(DATABASE.name)) {
              const taskStore = db.createObjectStore("tasks", {
                keyPath: "id",
                autoIncrement: true,
              });

              taskStore.createIndex("title", "title", { unique: false });
              taskStore.createIndex("isActive", "isActive", { unique: false });
              taskStore.createIndex("createdAt", "createdAt", {
                unique: false,
              });
              taskStore.createIndex("updatedAt", "updatedAt", {
                unique: false,
              });
              taskStore.createIndex("approxPomodoro", "approxPomodoro", {
                unique: false,
              });
              taskStore.createIndex("leftSecs", "leftSecs", { unique: false });
            }
          };

          request.onsuccess = () => {
            setDB(request.result);
            setStatus(DB_STATUS_CONSTANTS.CONNECTED);
            resolve(request.result);
          };

          // eslint-disable-next-line unicorn/prefer-add-event-listener
          request.onerror = (error) => {
            setStatus(DB_STATUS_CONSTANTS.ERROR);
            resolve(error);
          };
        });
      }
    };

    if (isIndexedDBExists() && process.env.NEXT_PUBLIC_IS_LOCAL === "true") {
      openDB();
    } else {
      setStatus(DB_STATUS_CONSTANTS.NOT_USED);
    }
  }, [getDB, getStatus, setDB, setStatus]);

  return { getStatus, getDB };
};

export default useIndexedDBConnection;
