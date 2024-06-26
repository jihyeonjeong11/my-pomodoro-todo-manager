import { useCallback, useEffect, useRef, useState } from "react";
import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { convertMsToTime } from "../functions";

const useClock = (tick: () => void) => {
  const savedTick = useRef<() => void | undefined>();

  useEffect(() => {
    savedTick.current = tick;
  }, [tick]);

  const {
    isStarted: { get: getIsStarted, set: setIsStarted },
    tab: { get: getTab, set: setTab },
  } = usePomodoro(["isStarted", "tab"]);
  const [circleOffset] = useState(300);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  const getTime = useCallback(
    () => `${convertMsToTime(getTab.countdown as number)}`,
    [getTab.countdown],
  );

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

  return { getTime, circleOffset };
};

export default useClock;
