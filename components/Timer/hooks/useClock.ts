import { useCallback, useEffect, useRef } from "react";
import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { convertMsToTime } from "../functions";

const useClock = (tick: () => void) => {
  const savedTick = useRef<() => void | undefined>();

  const {
    isStarted: { get: getIsStarted, set: setIsStarted },
    tab: { get: getTab, set: setTab },
  } = usePomodoro(["isStarted", "tab"]);
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
  }, [getIsStarted, setTab]);

  return { getTime };
};

export default useClock;
