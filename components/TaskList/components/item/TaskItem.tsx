import { SvgActive, SvgInactive, SvgX } from "@/public/media/icons";
import { motion } from "framer-motion";
import { type MouseEvent } from "react";
import useTaskItemTransition from "@/components/TaskList/components/hooks/useTaskItemTransition";

const TaskItem = ({
  task,
  removeTask,
  activeTask,
}: {
  task: any;
  removeTask: any;
  activeTask: any;
}) => {
  const motionProps = useTaskItemTransition();
  return (
    <motion.div onClick={() => activeTask(task.id)} {...motionProps}>
      {/* complete task function */}
      <button type="button">
        {task.isActive ? <SvgActive /> : <SvgInactive />}
      </button>
      {/* put task function */}
      <button type="button">
        <span>{task.title}</span>
      </button>
      <button
        type="button"
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          removeTask(task.id);
        }}
        aria-hidden="true"
      >
        <SvgX />
      </button>
    </motion.div>
  );
};

export default TaskItem;
