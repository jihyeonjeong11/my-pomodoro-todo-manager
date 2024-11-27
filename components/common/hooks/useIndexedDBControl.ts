import { setInitialTask } from "@/components/TaskList/components/functions";
import { type TaskWindowType } from "@/types/global";
import { type TaskType } from "@/types/TaskList";
import { useCallback } from "react";

const sortByOrder = (latestTasks: TaskType[], orderString: string) => {
  const order = JSON.parse(orderString);
  const tasks = order
    .map((id: number) => latestTasks.find((t) => t.id === id))
    .filter((t: TaskType) => t !== undefined);

  return tasks;
};
const useIndexedDBControl = (
  getDB: IDBDatabase | null,
  setTask: (value: TaskType[]) => void,
  setSelectedTask?: (value: TaskType) => void,
  getTaskWindows?: TaskWindowType,
  setTaskWindows?: (value: TaskWindowType) => void,
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
    [getDB],
  );

  const hydrateData = useCallback(async () => {
    if (getDB === null) {
      throw new Error("No db");
    }

    const transaction = getDB.transaction(["tasks", "session"], "readonly");
    const request = transaction.objectStore("tasks").getAll();
    request.onsuccess = () => {
      const sessionRequest = transaction.objectStore("session").get(0);

      sessionRequest.onsuccess = () => {
        if (
          sessionRequest.result?.order &&
          sessionRequest.result.order.length > 1
        ) {
          setTask(sortByOrder(request.result, sessionRequest.result.order));
        }
        if (sessionRequest.result?.activeId > -1 && setSelectedTask) {
          setSelectedTask(
            request.result.find((t) => t.id === sessionRequest.result.activeId),
          );
        }

        // If there specific order in property, need another block of logic handling that.
        if (getTaskWindows && setTaskWindows) {
          setTaskWindows(
            Object.fromEntries(
              Object.entries(getTaskWindows).filter(
                ([key]) => key !== "loader",
              ),
            ),
          );
        }
      };
    };

    return true;
  }, [getDB, getTaskWindows, setSelectedTask, setTask, setTaskWindows]);

  const postATaskToDB = useCallback(
    (getTasks: TaskType[], text: string) => {
      if (getDB !== null) {
        const transaction = getDB.transaction(
          ["tasks", "session"],
          "readwrite",
        );
        const request = transaction.objectStore("tasks");
        const newRow = setInitialTask(getTasks, text);
        const add = request.add(newRow);
        add.onsuccess = () => {
          if (getTaskWindows && setTaskWindows) {
            setTaskWindows({
              ...getTaskWindows,
              loader: { actionType: "refresh" },
            });
          }
        };
        // eslint-disable-next-line unicorn/prefer-add-event-listener
        add.onerror = () => {
          throw new Error(add.error?.message);
        };
      }
    },
    [getDB, getTaskWindows, setTaskWindows],
  );

  const deleteATaskFromDB = useCallback(
    (task: TaskType) => {
      if (getDB !== null) {
        const transaction = getDB.transaction(["tasks"], "readwrite");
        const request = transaction.objectStore("tasks").delete(task.id);

        request.onsuccess = () => {
          if (getTaskWindows && setTaskWindows) {
            setTaskWindows({
              ...getTaskWindows,
              loader: { actionType: "refresh" },
            });
          }
        };
        // eslint-disable-next-line unicorn/prefer-add-event-listener
        request.onerror = () => {
          throw new Error(request.error?.message);
        };
      }
    },
    [getDB, getTaskWindows, setTaskWindows],
  );

  const putATaskCompletedToDB = useCallback(
    (task: TaskType) => {
      if (getDB !== null) {
        const transaction = getDB.transaction(
          ["tasks", "session"],
          "readwrite",
        );
        const request = transaction.objectStore("tasks");
        const get = request.get(task.id);
        get.onsuccess = () => {
          request.put({ ...get.result, isCompleted: !get.result.isCompleted });
        };
      }
    },
    [getDB],
  );

  const putATaskActiveToDB = useCallback(
    (task: TaskType) => {
      if (getDB !== null) {
        const transaction = getDB.transaction(["session"], "readwrite");
        const request = transaction.objectStore("session");
        const get = request.get(0);

        get.onsuccess = () => {
          request.put({ ...get.result, activeId: task.id });
        };
      }
    },
    [getDB],
  );

  // Use this when the time allows.
  // const executeIfLocalDBEnabled = (callback: () => any, args) => {
  //   return isUseLocalDBOrNot() ? callback(args) : null;
  // };

  return {
    putOrPostOrder,
    hydrateData,
    postATaskToDB,
    deleteATaskFromDB,
    putATaskCompletedToDB,
    putATaskActiveToDB,
  };
};

export default useIndexedDBControl;
