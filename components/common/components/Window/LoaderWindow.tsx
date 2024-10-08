import { StyledLoaderWindow } from "@/components/common/styled/StyledWindows";
import { motion } from "framer-motion";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { SvgLoading } from "@/public/media/icons";
import { useEffect } from "react";
import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import { useTasklist } from "@/components/contexts/TasklistContext";
import useIndexedDBControl from "@/components/common/hooks/useIndexedDBControl";

// Static window for TaskList.
const LoaderWindow = ({ actionType }: { actionType: string }) => {
  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(["taskWindows"]);

  const {
    tasks: { get: getTasks, set: setTask },
  } = useTasklist(["tasks", "tasklistRef"]);

  const {
    db: { get: getDB },
  } = useIndexedDB(["status", "db"]);

  const { getAll, putOrPostOrder } = useIndexedDBControl(
    getDB,
    setTask,
    () => null,
    getTaskWindows,
    setTaskWindows
  );

  useEffect(() => {
    if (actionType === "refresh") {
      putOrPostOrder(getTasks);
      getAll(); // reorder, active
    }
  }, [actionType, getAll, getTasks, putOrPostOrder]);

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
