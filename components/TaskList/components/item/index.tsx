import { AnimatePresence } from "framer-motion";

const TaskItems: FC = ({ children }) => (
  <ul data-testid="task-items">
    <AnimatePresence>{children}</AnimatePresence>
  </ul>
);

export default TaskItems;
