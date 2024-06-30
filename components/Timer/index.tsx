import { type MutableRefObject, useRef, useCallback, useState } from "react";
import { type SelectedTabType } from "@/types/Timer";
import TabItem from "./Tabs/TabItem";
import { TABS } from "./constants";
import Clock from "./Clock";
import { findTab, getFromSet } from "./functions";
import { usePomodoro } from "../contexts/PomodoroContext";
import { StyledNav, StyledTimerHighlight } from "./styled/StyledTimer";

const Timer: FC = () => {
  const itemRefs: MutableRefObject<Set<HTMLDivElement>> = useRef(new Set());
  const {
    tab: { set, get },
  } = usePomodoro(["tab"]);

  const [animationStyle, setAnimationStyle] = useState({});

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

        const translate =
          found.textContent === "pomodoro"
            ? `translateX(-105%)` // buttonWidth + flexed padding value
            : // eslint-disable-next-line unicorn/no-nested-ternary
              found.textContent === "short break"
              ? `translateX(0%)`
              : `translateX(105%)`;
        setAnimationStyle({
          transform: translate,
          transition: "all 0.3s ease-in-out",
        });

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
        <StyledTimerHighlight
          className="tab-highlight"
          style={animationStyle}
        />
      </StyledNav>

      <Clock />
    </>
  );
};

export default Timer;
