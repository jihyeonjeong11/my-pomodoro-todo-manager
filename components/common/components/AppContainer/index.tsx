import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import useIndexedDBConnection from "@/components/common/hooks/useIndexedDBConnection";
import { Children, cloneElement, isValidElement, memo, useEffect } from "react";
import useIndexedDBControl from "@/components/common/hooks/useIndexedDBControl";
import { useTasklist } from "@/components/contexts/TasklistContext";
import useToggle from "@/components/common/hooks/useToggle";
import { DB_STATUS_CONSTANTS } from "@/components/common/constants";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { usePomodoro } from "@/components/contexts/PomodoroContext";

// logic container & sorter

// load all contexts
// load all custom hooks
// define functions
// pass them to children
const AppContainer: FC = ({ children }) => {
  const {
    status: { get: getStatus, set: setStatus },
    db: { get: getDB, set: setDB },
  } = useIndexedDB(["status", "db"]);

  const {
    tasks: { get: getTasks, set: setTask },
  } = useTasklist(["tasks"]);

  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(["taskWindows"]);

  const {
    tab: { get: getTab },
  } = usePomodoro(["isStarted", "tab"]);

  const [initiated, toggleInitiated] = useToggle();

  useIndexedDBConnection(getStatus, setStatus, getDB, setDB, getTasks);
  const { getAll } = useIndexedDBControl(getDB, setTask, getTasks);

  useEffect(() => {
    // Initial Hydrator
    if (getStatus === DB_STATUS_CONSTANTS.CONNECTED && getDB && !initiated) {
      getAll();
      toggleInitiated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStatus, getDB]);

  const childrenWithProps = Children.map(children, (child) => {
    console.log(child);
    if (isValidElement(child)) {
      return cloneElement(child, {});
    }
    return child;
  });

  return <div className="wrapper">{childrenWithProps}</div>;
};

export default memo(AppContainer);
