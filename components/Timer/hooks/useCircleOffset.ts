import { useCallback, useEffect, useState } from "react";
import { type TabWithMutableCountdown } from "@/types/Timer";
import { useTheme } from "styled-components";
import { type Sizes } from "@/types/global";

const useCircleOffset = (
  title: TabWithMutableCountdown["title"],
  countdown: number,
  decrementor: number,
  leftSecs: number,
) => {
  const { sizes } = useTheme() as { sizes: Sizes };

  const [circleOffset, setCircleOffset] = useState(
    sizes.timer.defaultCircleOffset,
  );

  const completeOffset = useCallback(
    () => setCircleOffset(sizes.timer.defaultCircleOffset),
    [sizes.timer.defaultCircleOffset],
  );

  useEffect(() => {
    const totalChange = decrementor;
    setCircleOffset((prev) => prev + totalChange);
  }, [leftSecs, decrementor]);

  useEffect(() => {
    setCircleOffset(sizes.timer.defaultCircleOffset);
  }, [sizes.timer.defaultCircleOffset, title]);

  useEffect(() => {
    if (countdown === 0) {
      setCircleOffset(sizes.timer.defaultCircleOffset);
    }
  }, [countdown, sizes.timer.defaultCircleOffset]);

  return { circleOffset, completeOffset };
};

export default useCircleOffset;
