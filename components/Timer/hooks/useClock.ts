import { SelectedCountdownType } from "@/types/Timer";
import { useCallback, useEffect, useState } from "react";
import { convertMsToTime } from "../functions";

const useClock = (ms: SelectedCountdownType) => {
  const [time, setTime] = useState(ms);
  const getTime = useCallback(() => `${convertMsToTime(time)}`, [time]);

  useEffect(() => {
    setTime(ms);
  }, [ms]);

  return { getTime };
};

export default useClock;
