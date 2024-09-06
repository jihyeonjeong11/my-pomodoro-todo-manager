import { SvgX } from "@/public/media/icons";
import { AnimatePresence, motion } from "framer-motion";

const TaskItem = ({ task, removeTask }: { task: any; removeTask: any }) => (
  <motion.li
    key={`task-${task.id}`}
    initial={{ x: "-100%", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: "100%", opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    {/* DragHandle */}
    <button type="button">r</button>
    <span>{task.title}</span>
    <SvgX onClick={() => removeTask(task.id)} />
  </motion.li>
);

export default TaskItem;
