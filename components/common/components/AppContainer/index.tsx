import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import useIndexedDBConnection from "@/components/common/hooks/useIndexedDBConnection";
import { useEffect, useState } from "react";
import useIndexedDBControl from "@/components/common/hooks/useIndexedDBControl";
import { useTasklist } from "@/components/contexts/TasklistContext";
import useToggle from "@/components/common/hooks/useToggle";
import { DB_STATUS_CONSTANTS } from "@/components/common/constants";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { StyledTimer } from "@/components/Timer/styled/StyledTimer";
import Timer from "@/components/Timer";
import { StyledList } from "@/components/TaskList/styled/StyledList";
import TaskList from "@/components/TaskList";
import WindowLoader from "@/components/common/components/WindowLoader";
import useTimerControl from "@/components/Timer/hooks/useTimerControl";
import { TABS, TIMER_STATUS } from "@/components/Timer/constants";

// logic container & sorter

// load all contexts
// load all custom hooks
// define functions
// pass them to children
const AppContainer: FC = () => {
  const {
    status: { get: getStatus, set: setStatus },
    db: { get: getDB, set: setDB },
  } = useIndexedDB(["status", "db"]);

  const {
    tasks: { get: getTasks, set: setTask },
    selectedTaskId: { get: getSelectedTaskId, set: setSelectedTaskId },
  } = useTasklist(["tasks", "selectedTaskId"]);

  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(["taskWindows"]);

  const {
    tab: { get: getTab, set: setTab },
  } = usePomodoro(["tab"]);

  const [initiated, toggleInitiated] = useToggle();
  const [initialCountdown, setInitialCountdown] = useState(1_500_000);
  const selectedTask = getTasks.find((t) => t.id === getSelectedTaskId);

  useIndexedDBConnection(getStatus, setStatus, getDB, setDB, getTasks);
  const { isStarted, toggle } = useTimerControl(getTab.title, initialCountdown);
  const { getAll } = useIndexedDBControl(getDB, setTask, getTasks);

  useEffect(() => {
    if (isStarted === TIMER_STATUS.stopped) {
      if (getTab.title === "pomodoro") {
        setInitialCountdown(TABS[0].countdown);
      } else if (getTab.title === "short break") {
        setInitialCountdown(TABS[1].countdown);
      } else {
        setInitialCountdown(TABS[2].countdown);
      }
    }
  }, [getTab.title, selectedTask, setSelectedTaskId, isStarted]);

  useEffect(() => {
    // Initial Hydrator
    if (getStatus === DB_STATUS_CONSTANTS.CONNECTED && getDB && !initiated) {
      getAll();
      toggleInitiated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStatus, getDB]);

  return (
    <div className="wrapper">
      <StyledTimer>
        <h1 className="spacing">Pomodoro timer</h1>
        <Timer
          getTab={getTab}
          setTab={setTab}
          selectedTask={selectedTask}
          initialCountdown={initialCountdown}
          setInitialCountdown={setInitialCountdown}
          isStarted={isStarted}
          toggle={toggle}
        />
      </StyledTimer>
      <StyledList>
        <TaskList getTab={getTab} setTab={setTab} selectedTask={selectedTask} />
      </StyledList>
      <WindowLoader />
    </div>
  );
};

export default AppContainer;
