import { SvgX } from "@/public/media/icons";
import { motion, useDragControls } from "framer-motion";

const TaskItem = ({
  task,
  removeTask,
  activeTask,
}: {
  task: any;
  removeTask: any;
  activeTask: any;
}) => {
  const controls = useDragControls();
  return (
    <motion.li
      drag="y"
      dragControls={controls}
      key={`task-${task.id}`}
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => activeTask(task.id)}
    >
      {/* DragHandle */}
      <button
        type="button"
        style={{ backgroundColor: task.isActive ? "white" : "transparent" }}
      >
        r
      </button>
      <span>{task.title}</span>
      <SvgX
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          removeTask(task.id);
        }}
      />
    </motion.li>
  );
};

export default TaskItem;
