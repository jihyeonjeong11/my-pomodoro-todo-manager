import { useCallback, useEffect } from "react";
import { type SelectedTabType } from "@/types/Timer";
import TabItem from "@/components/Timer/Tabs/TabItem";
import { TABS } from "@/components/Timer/constants";
import { findTab } from "@/components/Timer/functions";
import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import Tabs from "@/components/Timer/Tabs";
import Clock from "@/components/Timer/Clock";
import useIndexedDBConnection from "@/components/common/hooks/useIndexedDB";

const Timer: FC = () => {
  const {
    tab: { set, get },
  } = usePomodoro(["tab"]);

  const {
    status: { get: getStatus, set: setStatus },
    db: { get: getDB, set: setDB },
  } = useIndexedDB(["status", "db"]);

  useIndexedDBConnection(getStatus, setStatus, getDB, setDB);

  const onClick = useCallback(
    (selectedTitle: SelectedTabType) => {
      set(findTab(selectedTitle));
    },
    [set]
  );

  // useEffect(() => {
  //   if (getDB) {
  //     const transaction = getDB.transaction(["tasks"], "readwrite");
  //     const request = transaction.objectStore("tasks").getAll();

  //     request.onsuccess = (event) => {};

  //     // mockTasks.forEach((m) => {
  //     //   request.add(m);
  //     // });
  //   }
  // }, [getDB]);

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
