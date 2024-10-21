import { SvgActive, SvgInactive, SvgX } from "@/public/media/icons";
import { motion } from "framer-motion";
import { memo } from "react";
import useTaskItemTransition from "@/components/TaskList/components/hooks/useTaskItemTransition";
import { type TaskType } from "@/types/TaskList";
import { StyledTaskTitle } from "@/components/TaskList/styled/StyledList";

const TaskItem = ({
  task: { isCompleted, title, pomodoroCount, id },
  getSelectedTask,
  onClickDelete,
  onClickComplete,
  onClickActive,
}: {
  task: TaskType;
  getSelectedTask: TaskType;
  onClickDelete: any;
  onClickComplete: any;
  onClickActive: any;
}) => {
  const motionProps = useTaskItemTransition();

  return (
    <motion.div onClick={onClickActive} {...motionProps}>
      <button
        data-testid={`task-${id}-complete`}
        type="button"
        aria-label={`Mark task "${title}" as complete`}
        onClick={onClickComplete}
      >
        {isCompleted ? <SvgInactive /> : <SvgActive />}
      </button>
      <StyledTaskTitle
        $isactive={getSelectedTask.id === id && !isCompleted}
        $iscompleted={isCompleted}
      >
        {title} {pomodoroCount}
      </StyledTaskTitle>
      <button
        data-testid={`task-${id}-remove`}
        type="button"
        aria-label={`Delete task "${title}"`}
        onClick={onClickDelete}
      >
        <SvgX />
      </button>
    </motion.div>
  );
};

export default memo(TaskItem);
