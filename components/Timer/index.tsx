import { useCallback } from "react";
import { type SelectedTabType } from "@/types/Timer";
import TabItem from "@/components/Timer/Tabs/TabItem";
import { TABS } from "@/components/Timer/constants";
import { findTab } from "@/components/Timer/functions";
import { usePomodoro } from "@/components/contexts/PomodoroContext";
import Tabs from "@/components/Timer/Tabs";
import Clock from "@/components/Timer/Clock";

const Timer: FC = () => {
  const {
    tab: { set, get },
  } = usePomodoro(["tab"]);

  const onClick = useCallback(
    (selectedTitle: SelectedTabType) => {
      set(findTab(selectedTitle));
    },
    [set],
  );

  return (
    <>
      <Tabs>
        {TABS.map((item, index) => {
          const isSelected = item.title === get.title;
          return (
            <TabItem
              onClick={onClick}
              data-testid={`tab-item-${index}`}
              key={item.title}
              selectedTitle={item.title}
              isSelected={isSelected}
            />
          );
        })}
      </Tabs>

      <Clock />
    </>
  );
};

export default Timer;
