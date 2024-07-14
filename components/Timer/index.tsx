import { useCallback, useEffect } from "react";
import { type SelectedTabType } from "@/types/Timer";
import TabItem from "./Tabs/TabItem";
import { TABS } from "./constants";
import Clock from "./Clock";
import { findTab } from "./functions";
import { usePomodoro } from "../contexts/PomodoroContext";
import Tabs from "./Tabs";

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

  useEffect(() => {
    if (!("Notification" in window)) {
      console.error("This browser not supports web notification!");
    }
    Notification.requestPermission();
  }, []);

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
