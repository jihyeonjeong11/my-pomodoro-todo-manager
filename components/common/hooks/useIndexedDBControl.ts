import { type TaskType } from "@/types/TaskList";
import { useCallback } from "react";

// setSnapshot getsnapshot
// setCompletedTask, getCompletedTask

const useIndexedDBControl = (
  getDB: IDBDatabase | null,
  setTask: (value: TaskType[]) => void,
  getTaskWindows?: Record<string, any>,
  setTaskWindows?: (value: Record<string, any>) => void,
) => {
  const getAll = useCallback(() => {
    if (getDB === null) {
      throw new Error("No db");
    }

    const transaction = getDB.transaction(["tasks"], "readonly");
    const request = transaction.objectStore("tasks").getAll();

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    request.onerror = () => {
      throw new Error(request.error?.message ?? "unknown error");
    };

    request.onsuccess = () => {
      // Descending order.
      // If there specific order in property, need another block of logic handling that.
      setTask(request.result.sort((p, c) => c.createdAt - p.createdAt));
      if (getTaskWindows && setTaskWindows) {
        setTaskWindows(
          Object.fromEntries(
            Object.entries(getTaskWindows).filter(([key]) => key !== "loader"),
          ),
        );
      }
    };
    return true;
  }, [getDB, getTaskWindows, setTask, setTaskWindows]);

  return { getAll };
};

export default useIndexedDBControl;
