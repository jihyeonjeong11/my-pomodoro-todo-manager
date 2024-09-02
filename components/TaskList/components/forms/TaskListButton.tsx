import type React from "react";
import { motion } from "framer-motion";
import useTaskButtonTransition from "@/components/TaskList/components/hooks/useTaskButtonTransition";

type Props = {
  flipTaskButton: React.MouseEventHandler<HTMLButtonElement>;
  showAddForm: boolean;
};

const TaskListButton: React.FC<Props> = ({ flipTaskButton, showAddForm }) => {
  const flipProps = useTaskButtonTransition(showAddForm);

  return (
    <div className="motion-button">
      <motion.button
        onClick={flipTaskButton}
        type="button"
        title="Click this for add new task"
        {...flipProps}
      >
        <h3>Add New task</h3>
      </motion.button>
      <motion.div
        initial={false}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        animate={{
          opacity: [0, 1],
        }}
      >
        form here
      </motion.div>
    </div>
  );
};

export default TaskListButton;
