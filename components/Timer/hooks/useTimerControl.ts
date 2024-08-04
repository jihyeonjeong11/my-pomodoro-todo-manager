import { useCallback, useLayoutEffect, useState } from "react";
import { type TabWithMutableCountdown, type TimerType } from "@/types/Timer";
import { TIMER_STATUS } from "@/components/Timer/constants";
import useNotification from "@/components/Timer/hooks/useNotification";

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
) => {
  const [isStarted, setIsStarted] = useState<TimerType>(TIMER_STATUS.stopped);
  const { launchCompleteNotification } = useNotification();

  useLayoutEffect(() => {
    setIsStarted(TIMER_STATUS.stopped);
  }, [title]);

  useLayoutEffect(() => {
    if (countdown === 0) {
      launchCompleteNotification(title);
      setIsStarted(TIMER_STATUS.stopped);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  const toggle = useCallback(() => {
    setIsStarted((prev) =>
      prev === TIMER_STATUS.stopped
        ? TIMER_STATUS.started
        : TIMER_STATUS.stopped,
    );
  }, []);
  return { isStarted, toggle };
};

export default useTimerControl;
