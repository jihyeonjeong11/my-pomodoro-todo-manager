import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import useIndexedDBConnection from "@/components/common/hooks/useIndexedDBConnection";
import { useEffect } from "react";
import useIndexedDBControl from "@/components/common/hooks/useIndexedDBControl";
import { useTasklist } from "@/components/contexts/TasklistContext";
import useToggle from "@/components/common/hooks/useToggle";
import { DB_STATUS_CONSTANTS } from "@/components/common/constants";

const AppContainer: FC = ({ children }) => {
  const {
    status: { get: getStatus, set: setStatus },
    db: { get: getDB, set: setDB },
  } = useIndexedDB(["status", "db"]);

  const {
    tasks: { get: getTasks, set: setTask },
  } = useTasklist(["tasks"]);

  const [initiated, toggleInitiated] = useToggle();

  useIndexedDBConnection(getStatus, setStatus, getDB, setDB, getTasks);
  const { getAll } = useIndexedDBControl(getDB, setTask, getTasks);

  useEffect(() => {
    if (getStatus === DB_STATUS_CONSTANTS.CONNECTED && getDB && !initiated) {
      getAll();
      toggleInitiated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStatus, getDB]);

  return <div className="wrapper">{children}</div>;
};

export default AppContainer;
