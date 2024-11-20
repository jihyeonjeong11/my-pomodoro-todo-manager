import { useCallback, useEffect, useState } from "react";
import { type TabWithMutableCountdown, type TimerType } from "@/types/Timer";
import { TIMER_STATUS } from "@/components/Timer/constants";
import useNotification from "@/components/Timer/hooks/useNotification";
import { type TaskType } from "@/types/TaskList";
import { findTab } from "@/components/Timer/functions";
import { isUseLocalDBOrNot } from "@/components/common/functions";
import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import { Microwave } from "@/public/media/sounds";

const useTimerControl = (
  title: TabWithMutableCountdown["title"],
  countdown: number,
  setTab: (value: TabWithMutableCountdown) => void,
  selectedTask: TaskType,
  getTasks: TaskType[],
  setTask: (value: TaskType[]) => void,
) => {
  const {
    db: { get: getDB },
  } = useIndexedDB(["db"]);

  const originalTab = findTab(title);
  const [isStarted, setIsStarted] = useState<TimerType>(TIMER_STATUS.stopped);
  const { launchCompleteNotification } = useNotification();

  const toggle = useCallback(() => {
    if (countdown === 0) {
      setTab(originalTab);
    }

    setIsStarted((prev) =>
      prev === TIMER_STATUS.stopped
        ? TIMER_STATUS.started
        : TIMER_STATUS.stopped,
    );
  }, [countdown, originalTab, setTab]);

  const completeTimer = useCallback(() => {
    const audio = new Audio(Microwave);
    audio.play();
    launchCompleteNotification(title);
    if (title === "pomodoro" && selectedTask?.id > -1) {
      if (isUseLocalDBOrNot()) {
        if (getDB) {
          const transaction = getDB.transaction(["tasks"], "readwrite");
          const request = transaction.objectStore("tasks");
          const get = request.get(selectedTask.id);
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
          t.id === selectedTask.id
            ? {
                ...t,
                pomodoroCount: t.pomodoroCount + 1,
              }
            : t,
        ),
      );
      toggle();
    }
    setTab(originalTab);
  }, [
    getDB,
    getTasks,
    launchCompleteNotification,
    originalTab,
    selectedTask.id,
    setTab,
    setTask,
    title,
    toggle,
  ]);

  useEffect(() => {
    setIsStarted(TIMER_STATUS.stopped);
  }, [title]);

  useEffect(() => {
    // this actually works with latest context.
    if (isStarted === TIMER_STATUS.done) {
      completeTimer();
    }
  }, [completeTimer, isStarted]);

  return { isStarted, setIsStarted, toggle, completeTimer };
};

export default useTimerControl;
