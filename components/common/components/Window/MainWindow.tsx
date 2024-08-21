import {
  StyledBackdrop,
  StyledMainWindow,
} from "@/components/common/styled/StyledWindows";
import TaskList from "@/components/TaskList";
import { motion } from "framer-motion";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { toggleMainTaskWindow } from "@/components/TaskList/functions";

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
  return (
    <>
      <StyledBackdrop
        onClick={() =>
          toggleMainTaskWindow(true, getTaskWindows, setTaskWindows)
        }
      />
      <StyledMainWindow
        as={motion.aside}
        variants={fromBottom}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <TaskList />
      </StyledMainWindow>
    </>
  );
};

export default MainWindow;
