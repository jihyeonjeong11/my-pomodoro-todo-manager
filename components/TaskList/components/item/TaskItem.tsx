import { SvgX } from "@/public/media/icons";
import { motion } from "framer-motion";

const TaskItem = ({ task, removeTask }: { task: any; removeTask: any }) => (
  <motion.div
    key={`task-${task.id}`}
    initial={{ x: "-100%", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: "100%", opacity: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
  >
    {/* resizehandle */}
    <button type="button">r</button>
    <span>{task.title}</span>
    <SvgX onClick={() => removeTask(task.id)} />
  </motion.div>
);

export default TaskItem;
