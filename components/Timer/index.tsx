import { type SetStateAction, useCallback } from "react";
import {
  type TabWithMutableCountdown,
  type SelectedTabType,
} from "@/types/Timer";
import { type TaskType } from "@/types/TaskList";
import TabItem from "@/components/Timer/Tabs/TabItem";
import { TABS } from "@/components/Timer/constants";
import { findTab } from "@/components/Timer/functions";
import Clock from "@/components/Timer/Clock";

type Props = {
  getTab: TabWithMutableCountdown;
  setTab: (value: TabWithMutableCountdown) => void;
  selectedTask: TaskType | undefined;
  initialCountdown: number;
  setInitialCountdown: SetStateAction<number>;
};

const Timer: FC<Props> = ({
  getTab,
  setTab,
  selectedTask,
  initialCountdown,
  setInitialCountdown,
  isStarted,
  toggle,
}) => {
  const onClickTabItem = useCallback(
    (selectedTitle: SelectedTabType) => {
      setTab(findTab(selectedTitle));
    },
    [setTab]
  );

  return (
    <>
      <nav data-testid="tab">
        {TABS.map((item, index) => {
          const isSelected = item.title === getTab.title;
          return (
            <TabItem
              onClickTabItem={onClickTabItem}
              data-testid={`tab-item-${index}`}
              key={item.title}
              selectedTitle={item.title}
              isSelected={isSelected}
            />
          );
        })}
      </nav>
      <Clock
        getTab={getTab}
        setTab={setTab}
        selectedTask={selectedTask}
        initialCountdown={initialCountdown}
        setInitialCountdown={setInitialCountdown}
        isStarted={isStarted}
        toggle={toggle}
      />
    </>
  );
};

export default Timer;
