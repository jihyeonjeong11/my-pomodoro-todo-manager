import { motion } from "framer-motion";
import { type MutableRefObject, useRef, useCallback, useState } from "react";
import { type SelectedTabType } from "@/types/Timer";
import TabItem from "./Tabs/TabItem";
import { TABS, TAB_CENTER_X, TAB_LEFT_X, TAB_RIGHT_X } from "./constants";
import Clock from "./Clock";
import { findTab, getFromSet } from "./functions";
import { usePomodoro } from "../contexts/PomodoroContext";
import { StyledNav, StyledTimerHighlight } from "./styled/StyledTimer";

const MotionTimerHighlight = motion(StyledTimerHighlight);

const Timer: FC = () => {
  const itemRefs: MutableRefObject<Set<HTMLDivElement>> = useRef(new Set());
  const {
    tab: { set, get },
  } = usePomodoro(["tab"]);

  const [highlightX, setHighlightX] = useState(TAB_LEFT_X);

  const onClick = useCallback(
    (e: MouseEvent, selectedTitle: SelectedTabType) => {
      const currentTarget = e?.currentTarget as HTMLButtonElement;
      const container = currentTarget.closest(".tab-item") as HTMLDivElement;
      if (e?.currentTarget && itemRefs.current.has(container)) {
        const found = getFromSet(
          itemRefs.current,
          (ele) => ele.textContent === currentTarget.textContent,
        );
        if (!found) {
          throw new Error("must be element");
        }

        const newX =
          found.textContent === "pomodoro"
            ? TAB_LEFT_X
            : // eslint-disable-next-line unicorn/no-nested-ternary
              found.textContent === "short break"
              ? TAB_CENTER_X
              : TAB_RIGHT_X;

        setHighlightX(newX);
        set(findTab(selectedTitle));
      }
    },
    [set],
  );

  return (
    <>
      <StyledNav>
        {TABS.map((item, index) => {
          const isSelected = item.title === get.title;
          return (
            <TabItem
              onClick={onClick}
              itemRefs={itemRefs}
              data-testid={`tab-item-${index}`}
              key={item.title}
              selectedTitle={item.title}
              isSelected={isSelected}
            />
          );
        })}
        <MotionTimerHighlight
          className="tab-highlight"
          animate={{ x: `${highlightX}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </StyledNav>

      <Clock />
    </>
  );
};

export default Timer;
