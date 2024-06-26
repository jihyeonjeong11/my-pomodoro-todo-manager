import { useCallback, useEffect, useRef, useState } from "react";
import { SelectedCountdownType, TimerType } from "@/types/Timer";
import { convertMsToTime } from "../functions";

const useClock = (ms: SelectedCountdownType, isStarted: TimerType) => {
  const [time, setTime] = useState<SelectedCountdownType | number>(ms);
  console.log(time);
  const intervalRef = useRef<number | undefined>();

  const getTime = useCallback(() => `${convertMsToTime(time)}`, [time]);

  useEffect(() => {
    setTime(ms);
    window.clearInterval(intervalRef.current);
  }, [ms]);

  useEffect(() => {
    if (isStarted === "started") {
      intervalRef.current = window.setInterval(
        () => setTime((prev) => prev - 1000),
        1000,
      );
    } else {
      window.clearInterval(intervalRef.current);
    }

    return () => window.clearInterval(intervalRef.current);
  }, [isStarted]);

  return { getTime };
};

export default useClock;
