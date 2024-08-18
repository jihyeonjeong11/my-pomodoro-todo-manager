import StyledMainWindow from "@/components/common/styled/StyledWindows";
import TaskList from "@/components/TaskList";
import { motion } from "framer-motion";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

// Static window for TaskList.
const MainWindow = () => (
  <StyledMainWindow
    as={motion.aside}
    variants={dropIn}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <TaskList />
  </StyledMainWindow>
);

export default MainWindow;
