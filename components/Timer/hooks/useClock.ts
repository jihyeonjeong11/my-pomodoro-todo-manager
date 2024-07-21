import { useCallback, useEffect, useRef } from "react";
import { type TabWithMutableCountdown, type TimerType } from "@/types/Timer";
import { convertMsToTime } from "../functions";

const useClock = (
  tick: () => void, // useCallback
  getTab: TabWithMutableCountdown, // tab info for title and time value
  getIsStarted: TimerType,
  setIsStarted: (value: "stopped" | "started") => void, // timer conteroller
) => {
  const savedTick = useRef<() => void | undefined>();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  const getTime = useCallback(
    () => `${convertMsToTime(getTab.countdown as number)}`,
    [getTab.countdown],
  );

  useEffect(() => {
    if (getTab.countdown === 0) {
      setIsStarted("stopped");
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;

      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            // eslint-disable-next-line no-new
            new Notification(`Your ${getTab.title} done!`);
          }
        });
      }
    }
    savedTick.current = tick;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
    setIsStarted("stopped");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTab.title]);

  useEffect(() => {
    if (getIsStarted === "stopped") {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, [getIsStarted]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (getIsStarted === "started" && savedTick.current) {
        savedTick.current();
        timeoutRef.current = setTimeout(savedTick.current, 1000);
      }
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [getIsStarted]);

  return { getTime };
};

export default useClock;
