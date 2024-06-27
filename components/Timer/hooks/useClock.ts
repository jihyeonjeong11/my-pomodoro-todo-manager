import { useCallback, useEffect, useRef, useState } from "react";
import { TabWithMutableCountdown, TimerType } from "@/types/Timer";
import { convertMsToTime } from "../functions";
import { TIMER_STATUS } from "../constants";

const useClock = (
  tab: TabWithMutableCountdown,
  setTab: (tab: TabWithMutableCountdown) => void,
  isStarted: TimerType,
  setIsStarted: (timerStatus: TimerType) => void
) => {
  const [circleOffset, setCircleOffset] = useState(300);
  const intervalRef = useRef<number | undefined>();
  const getTime = useCallback(
    () => `${convertMsToTime(tab.countdown as number)}`,
    [tab.countdown]
  );
  useEffect(() => {
    console.log("tab changed");
    //setIsStarted(TIMER_STATUS.stopped);
    // intervalRef.current = undefined;
    // window.clearInterval(intervalRef.current);
  }, [tab]);

  useEffect(() => {
    if (isStarted === "started") {
      intervalRef.current = window.setInterval(() => {
        setTab({ ...tab, countdown: (tab.countdown as number) - 1000 });
        setCircleOffset((prev) => prev - 300 / 1800);
      }, 1000);
    } else {
      window.clearInterval(intervalRef.current);
    }
    return () => window.clearInterval(intervalRef.current);
  }, [isStarted]);

  return { getTime, circleOffset };
};

export default useClock;
