import { useEffect, useState } from "react";

import { DEFAULT_CIRCLE_OFFSET } from "@/components/Timer/constants";
import { type TabWithMutableCountdown } from "@/types/Timer";

const useCircleOffset = (
  title: TabWithMutableCountdown["title"],
  countdown: number,
  decrementor: number,
  leftSecs: number
) => {
  const [circleOffset, setCircleOffset] = useState(DEFAULT_CIRCLE_OFFSET);

  useEffect(() => {
    const totalChange = decrementor;

    setCircleOffset((prev) => prev + totalChange);
  }, [leftSecs, decrementor]);

  useEffect(() => {
    setCircleOffset(DEFAULT_CIRCLE_OFFSET);
  }, [title]);

  useEffect(() => {
    if (countdown === 0) {
      setCircleOffset(DEFAULT_CIRCLE_OFFSET);
    }
  }, [countdown]);

  return { circleOffset };
};

export default useCircleOffset;
