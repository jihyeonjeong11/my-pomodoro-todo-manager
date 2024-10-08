import { useEffect } from "react";
import { isIndexedDBCallable } from "@/components/common/hooks/functions";
import { DB_STATUS_CONSTANTS } from "@/components/common/constants";
import { type StatusType } from "@/types/dbLocal";
import { isUseLocalDBOrNot } from "@/components/common/functions";

const DATABASE = {
  name: "pomodoro-tasklist",
  version: 2,
};

const useIndexedDBConnection = (
  getStatus: StatusType,
  setStatus: (value: StatusType) => void,
  getDB: IDBDatabase | null,
  setDB: (value: IDBDatabase | null) => void
) => {
  useEffect(() => {
    const openDB = async () => {
      if (isUseLocalDBOrNot() && isIndexedDBCallable() && !getDB) {
        setStatus(DB_STATUS_CONSTANTS.NOT_CONNECTED);
        await new Promise((resolve) => {
          const request = indexedDB.open(DATABASE.name, DATABASE.version);

          request.onupgradeneeded = () => {
            const db = request.result;

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
              taskStore.createIndex("isCompleted", "isCompleted", {
                unique: true,
              });

              const orderStore = db.createObjectStore("session", {
                keyPath: "id",
              });
              orderStore.createIndex("order", "order");
              orderStore.createIndex("activeId", "activeId");
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

    if (isIndexedDBCallable() && process.env.NEXT_PUBLIC_IS_LOCAL === "true") {
      openDB();
    } else {
      setStatus(DB_STATUS_CONSTANTS.NOT_USED);
    }
  }, [getDB, getStatus, setDB, setStatus]);
};

export default useIndexedDBConnection;
