import { useCallback, useEffect, useState } from "react";
import { type TabWithMutableCountdown, type TimerType } from "@/types/Timer";
import { TIMER_STATUS } from "@/components/Timer/constants";
import useNotification from "@/components/Timer/hooks/useNotification";
import { type TaskType } from "@/types/TaskList";
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

  const [isStarted, setIsStarted] = useState<TimerType>(TIMER_STATUS.stopped);
  const { launchCompleteNotification } = useNotification();

  const completeTimer = useCallback(() => {
    const audio = new Audio(Microwave);
    audio.play();
    launchCompleteNotification(title);
    if (title === "pomodoro" && selectedTask?.id > -1) {
      if (isUseLocalDBOrNot() && getDB) {
        const transaction = getDB.transaction(["tasks"], "readwrite");
        const request = transaction.objectStore("tasks");
        const get = request.get(selectedTask.id);
        get.onsuccess = () => {
          request.put({
            ...get.result,
            pomodoroCount: get.result.pomodoroCount + 1,
          });
        };
      }

      setIsStarted(TIMER_STATUS.stopped);

      // jury rigged but it works. I can use useDebounce or other solution to isolate context action.
      setTimeout(
        () =>
          setTask(
            getTasks.map((t) =>
              t.id === selectedTask.id
                ? {
                    ...t,
                    pomodoroCount: t.pomodoroCount + 1,
                  }
                : t,
            ),
          ),
        1000,
      );
    }
  }, [
    getDB,
    getTasks,
    launchCompleteNotification,
    selectedTask.id,
    setTask,
    title,
  ]);

  const toggle = useCallback(() => {
    setIsStarted((prev) =>
      prev === TIMER_STATUS.stopped
        ? TIMER_STATUS.started
        : TIMER_STATUS.stopped,
    );
  }, []);

  useEffect(() => {
    setIsStarted(TIMER_STATUS.stopped);
  }, [title]);

  useEffect(() => {
    if (isStarted === TIMER_STATUS.done) {
      completeTimer();
    }
  }, [isStarted, completeTimer]);

  return { isStarted, setIsStarted, toggle, completeTimer };
};

export default useTimerControl;
