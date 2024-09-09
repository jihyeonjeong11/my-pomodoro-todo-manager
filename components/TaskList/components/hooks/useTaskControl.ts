import { type TaskType } from "@/types/TaskList";
import { useCallback, useEffect, useRef } from "react";
import {
  filterTask,
  setInitialTask,
  makeFirstTaskActiveIfCurrentActivatedChanged,
  setCompleteTask,
  setOthersInactive,
} from "@/components/TaskList/components/functions";
import { TABS } from "@/components/Timer/constants";

// post, delete, reorder, active callback
export const useTaskControl = (tasks: TaskType[]) => {
  const savedTasks = useRef(tasks);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedTasks.current = tasks;
  }, [tasks]);

  const postTask = useCallback(
    (text: string, callback: (value: TaskType[]) => void) =>
      callback([setInitialTask(tasks, text), ...setOthersInactive(tasks)]),
    [tasks],
  );

  const deleteTask = useCallback(
    (id: TaskType["id"], callback: (value: TaskType[]) => void) =>
      callback(
        makeFirstTaskActiveIfCurrentActivatedChanged(filterTask(tasks, id)),
      ),
    [tasks],
  );

  const completeTask = useCallback(
    (id: TaskType["id"], callback: (value: TaskType[]) => void) => {
      callback([
        ...makeFirstTaskActiveIfCurrentActivatedChanged(filterTask(tasks, id)),
        setCompleteTask(tasks, id),
      ]);
    },
    [tasks],
  );

  const activeTask = useCallback(
    (id: TaskType["id"], callback: (value: TaskType[]) => void) => {
      callback(
        tasks.map((t) =>
          t.id === id ? { ...t, isActive: true } : { ...t, isActive: false },
        ),
      );
    },
    [tasks],
  );

  const reactiveTask = useCallback(
    (id: TaskType["id"], callback: (value: TaskType[]) => void) => {
      callback(
        tasks.map((t) =>
          t.id === id
            ? { ...t, isActive: true, leftSecs: TABS[0].countdown }
            : { ...t, isActive: false },
        ),
      );
    },
    [tasks],
  );

  return { postTask, deleteTask, completeTask, activeTask, reactiveTask };
};
