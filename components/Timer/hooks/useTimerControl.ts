import { useCallback, useEffect, useState } from "react";
import { type TabWithMutableCountdown, type TimerType } from "@/types/Timer";
import { TIMER_STATUS } from "@/components/Timer/constants";
import useNotification from "@/components/Timer/hooks/useNotification";
import { type TaskType } from "@/types/TaskList";
import { findTab } from "@/components/Timer/functions";
import { isUseLocalDBOrNot } from "@/components/common/functions";
import { useIndexedDB } from "@/components/contexts/IndexedDBContext";

/**
 * Custom hook for controlling a timer.
 *
 * This hook manages the state of a timer, handling start/stop functionality
 * and launching notifications when the timer reaches zero. It uses the
 * useNotification hook to handle notification permissions.
 *
 * @param {TabWithMutableCountdown["title"]} title - The title of the timer.
 * @param {number} countdown - The current countdown value in miliseconds.
 *
 * @returns {{
 *   isStarted: TimerType,
 *   toggle: () => void
 * }} An object containing the timer's current status and a function to toggle it.
 *
 * @example
 * ```tsx
 * const { isStarted, toggle } = useTimerControl("pomodoro", 1000);
 *
 * return (
 *   <button onClick={toggle}>
 *     {isStarted === TIMER_STATUS.started ? "Stop" : "Start"}
 *   </button>
 * );
 * ```
 */

const useTimerControl = (
  title: TabWithMutableCountdown["title"],
  countdown: number,
  setTab: (value: TabWithMutableCountdown) => void,
  selectedTaskId: number,
  getTasks: TaskType[],
  setTask: (value: TaskType[]) => void
) => {
  const {
    db: { get: getDB },
  } = useIndexedDB(["db"]);

  const originalTab = findTab(title);
  const [isStarted, setIsStarted] = useState<TimerType>(TIMER_STATUS.stopped);
  const { launchCompleteNotification } = useNotification();

  useEffect(() => {
    setIsStarted(TIMER_STATUS.stopped);
  }, [title]);

  useEffect(() => {
    if (countdown === 0) {
      launchCompleteNotification(title);
      setIsStarted(TIMER_STATUS.stopped);
      if (title === "pomodoro" && selectedTaskId > -1) {
        if (isUseLocalDBOrNot()) {
          if (getDB) {
            const transaction = getDB.transaction(["tasks"], "readwrite");
            const request = transaction.objectStore("tasks");
            const get = request.get(selectedTaskId);
            get.onsuccess = () => {
              request.put({
                ...get.result,
                pomodoroCount: get.result.pomodoroCount + 1,
              });
            };
          } else {
            return;
          }
        }

        setTask(
          getTasks.map((t) =>
            t.id === selectedTaskId
              ? {
                  ...t,
                  pomodoroCount: t.pomodoroCount + 1,
                }
              : t
          )
        );

        setTab(originalTab);
      }
    }
  }, [
    countdown,
    title,
    launchCompleteNotification,
    selectedTaskId,
    setTask,
    getTasks,
    setTab,
    originalTab,
    getDB,
  ]);

  const toggle = useCallback(() => {
    if (countdown === 0) {
      setTab(originalTab);
    }

    setIsStarted((prev) =>
      prev === TIMER_STATUS.stopped
        ? TIMER_STATUS.started
        : TIMER_STATUS.stopped
    );
  }, [countdown, originalTab, setTab]);
  return { isStarted, toggle };
};

export default useTimerControl;
