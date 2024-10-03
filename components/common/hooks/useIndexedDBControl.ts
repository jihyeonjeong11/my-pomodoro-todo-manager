import { type TaskType } from "@/types/TaskList";
import { useCallback } from "react";

const sortByOrder = (latestTasks: TaskType[], orderString: string) => {
  const order = JSON.parse(orderString);
  const tasks = order
    .map((id: number) => latestTasks.find((t) => t.id === id))
    .filter((t: TaskType) => t !== undefined);

  return tasks;
};

// setSnapshot getsnapshot
// setCompletedTask, getCompletedTask

const useIndexedDBControl = (
  getDB: IDBDatabase | null,
  setTask: (value: TaskType[]) => void,
  getTaskWindows?: Record<string, any>,
  setTaskWindows?: (value: Record<string, any>) => void
) => {
  const putOrPostOrder = useCallback(
    (getTasks: TaskType[]) => {
      if (getDB === null) {
        throw new Error("No db");
      }
      const transaction = getDB.transaction(["session"], "readwrite");
      const sessionRequest = transaction.objectStore("session");
      const get = sessionRequest.get(0);

      get.onsuccess = () => {
        if (get.result === undefined) {
          sessionRequest.add({
            id: 0,
            order: JSON.stringify(getTasks.map((t) => t.id)),
          });
        } else {
          sessionRequest.put({
            id: 0,
            order: JSON.stringify(getTasks.map((t) => t.id)),
          });
        }
      };
      // eslint-disable-next-line unicorn/prefer-add-event-listener
      get.onerror = () => {
        throw new Error("unexpected Error");
      };
    },
    [getDB]
  );

  const getAll = useCallback(async () => {
    if (getDB === null) {
      throw new Error("No db");
    }

    const transaction = getDB.transaction(["tasks", "session"], "readonly");
    const request = transaction.objectStore("tasks").getAll();

    request.onsuccess = () => {
      const sessionRequest = transaction.objectStore("session").get(0);

      sessionRequest.onsuccess = () => {
        setTask(sortByOrder(request.result, sessionRequest.result.order));

        // If there specific order in property, need another block of logic handling that.
        if (getTaskWindows && setTaskWindows) {
          setTaskWindows(
            Object.fromEntries(
              Object.entries(getTaskWindows).filter(([key]) => key !== "loader")
            )
          );
        }
      };
    };
    return true;
  }, [getDB, getTaskWindows, setTask, setTaskWindows]);

  return { putOrPostOrder, getAll };
};

export default useIndexedDBControl;
