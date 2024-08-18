import StyledMainWindow from "@/components/common/styled/StyledWindows";
import TaskList from "@/components/TaskList";
import { motion } from "framer-motion";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";

const fromBottom = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "linear",
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

// Static window for TaskList.
const MainWindow = () => {
  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(["taskWindows"]);

  const toggleMainTaskWindow = () => {
    if (Object.prototype.hasOwnProperty.call(getTaskWindows, "main")) {
      const updatedWindows = { ...getTaskWindows };
      delete updatedWindows.main;
      setTaskWindows(updatedWindows);
    } else {
      setTaskWindows({ ...getTaskWindows, main: {} });
    }
  };
  return (
    <StyledMainWindow
      onClick={toggleMainTaskWindow}
      as={motion.aside}
      variants={fromBottom}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <TaskList />
    </StyledMainWindow>
  );
};

export default MainWindow;
