import { type TaskType } from "@/types/TaskList";
import { useCallback, useEffect, useRef } from "react";
import {
  filterTask,
  setInitialTask,
  setCompleteTask,
} from "@/components/TaskList/components/functions";
import { TABS } from "@/components/Timer/constants";

/**
 * Custom hook to manage task operations such as posting, deleting, completing,
 * and activating tasks in a task list.
 *
 * @param {TaskType[]} tasks - The current list of tasks.
 * @returns {{
 *   postTask: (text: string, callback: (value: TaskType[]) => void) => void,
 *   deleteTask: (id: TaskType["id"], callback: (value: TaskType[]) => void) => void,
 *   completeTask: (id: TaskType["id"], callback: (value: TaskType[]) => void) => void,
 *   activateOrReactivateTask: (
 *     id: TaskType["id"],
 *     isCompleted: boolean,
 *     callback: (value: TaskType) => void
 *   ) => void
 * }}
 */
const useTaskControl = (tasks: TaskType[]) => {
  const savedTasks = useRef(tasks);

  /**
   * Syncs the latest task list with `savedTasks`.
   * Updates the reference whenever the tasks change.
   */
  useEffect(() => {
    savedTasks.current = tasks;
  }, [tasks]);

  /**
   * Adds a new task to the list, making it the first task and setting
   * all others as inactive.
   *
   * @param {string} text - The text of the new task.
   * @param {function} callback - Callback function to update the task list.
   */
  const postTask = useCallback(
    (text: string, callback: (value: TaskType[]) => void) =>
      callback([setInitialTask(tasks, text), ...tasks]),
    [tasks]
  );

  /**
   * Deletes a task by its ID and reactivates the first task if the current
   * active task has changed.
   *
   * @param {TaskType["id"]} id - The ID of the task to be deleted.
   * @param {function} callback - Callback function to update the task list.
   */
  const deleteTask = useCallback(
    (id: TaskType["id"], callback: (value: TaskType[]) => void) =>
      callback(filterTask(tasks, id)),
    [tasks]
  );

  /**
   * Marks a task as complete and updates the list. The completed task is
   * moved to the bottom of the list.
   *
   * @param {TaskType["id"]} id - The ID of the task to be completed.
   * @param {function} callback - Callback function to update the task list.
   */
  const completeTask = useCallback(
    (id: TaskType["id"], callback: (value: TaskType[]) => void) => {
      callback([...filterTask(tasks, id), setCompleteTask(tasks, id)]);
    },
    [tasks]
  );

  /**
   * Activates a task by its ID, setting it as active and making all other
   * tasks inactive.
   *
   * @param {TaskType["id"]} id - The ID of the task to be activated.
   * @param {function} callback - Callback function to update the task list.
   */
  const activateTask = useCallback(
    (id: TaskType["id"], callback: (value: TaskType) => void) => {
      callback(tasks.find((t) => t.id === id) as TaskType);
    },
    [tasks]
  );

  /**
   * Reactivates a completed task, setting it as active with the initial countdown time.
   *
   * @param {TaskType["id"]} id - The ID of the task to be reactivated.
   * @param {function} callback - Callback function to update the task list.
   */
  const reactivateTask = useCallback(
    (id: TaskType["id"], callback: (value: TaskType) => void) => {
      callback({
        ...tasks.find((t) => t.id === id),
        leftSecs: TABS[0].countdown,
      } as TaskType);
    },
    [tasks]
  );

  /**
   * Activates a task if it is not completed, or reactivates it if it is completed.
   *
   * @param {TaskType["id"]} id - The ID of the task.
   * @param {boolean} isCompleted - Indicates if the task is completed.
   * @param {function} callback - Callback function to update the task list.
   */
  const activateOrReactivateTask = useCallback(
    (
      id: TaskType["id"],
      isCompleted: boolean,
      callback: (value: TaskType) => void
    ) => {
      if (isCompleted) {
        reactivateTask(id, callback);
      } else {
        activateTask(id, callback);
      }
    },
    [reactivateTask, activateTask]
  );

  return { postTask, deleteTask, completeTask, activateOrReactivateTask };
};

export default useTaskControl;
