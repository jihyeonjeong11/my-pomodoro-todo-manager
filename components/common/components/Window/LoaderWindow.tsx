import { StyledLoaderWindow } from "@/components/common/styled/StyledWindows";
import { motion } from "framer-motion";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { SvgLoading } from "@/public/media/icons";
import { useEffect } from "react";
import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import { useTasklist } from "@/components/contexts/TasklistContext";

// Static window for TaskList.
const LoaderWindow = (actionType) => {
  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(["taskWindows"]);

  const {
    tasks: { set: setTask },
  } = useTasklist(["tasks", "tasklistRef"]);

  const {
    status: { get: getStatus, set: setStatus },
    db: { get: getDB, set: setDB },
  } = useIndexedDB(["status", "db"]);

  useEffect(() => {
    if (actionType.isRefresher && getStatus === "connected") {
      const transaction = getDB.transaction(["tasks"], "readwrite");
      const request = transaction.objectStore("tasks").getAll();

      request.onsuccess = (event) => {
        setTask(event.target.result);
        setTaskWindows(
          Object.fromEntries(
            Object.entries(getTaskWindows).filter(([key]) => key !== "loader")
          )
        );
      };
    }
  }, actionType);

  return (
    <StyledLoaderWindow
      as={motion.aside}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <SvgLoading />
    </StyledLoaderWindow>
  );
};

export default LoaderWindow;
