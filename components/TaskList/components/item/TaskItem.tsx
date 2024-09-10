import { SvgActive, SvgInactive, SvgX } from "@/public/media/icons";
import { motion } from "framer-motion";
import { memo, useCallback, type MouseEvent } from "react";
import useTaskItemTransition from "@/components/TaskList/components/hooks/useTaskItemTransition";
import { type TaskType } from "@/types/TaskList";
import { StyledTaskTitle } from "@/components/TaskList/styled/StyledList";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { useTaskControl } from "@/components/TaskList/components/hooks/useTaskControl";

const TaskItem = ({ task }: { task: TaskType }) => {
  const {
    tasks: { get: getTasks, set: setTask },
  } = useTasklist(["tasks", "tasklistRef"]);
  const motionProps = useTaskItemTransition();

  const { deleteTask, completeTask, activateOrReactivateTask } =
    useTaskControl(getTasks);
  const isCompleted = task.leftSecs === 0;

  const onClickActive = useCallback(() => {
    activateOrReactivateTask(task.id, isCompleted, setTask);
  }, [setTask, task.id, isCompleted, activateOrReactivateTask]);

  const onClickDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      deleteTask(task.id, setTask);
    },
    [deleteTask, setTask, task.id],
  );

  const onClickComplete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      completeTask(task.id, setTask);
    },
    [completeTask, setTask, task.id],
  );

  return (
    <motion.div onClick={onClickActive} {...motionProps}>
      {/* complete task function */}
      <button
        type="button"
        aria-label={`Mark task "${task.title}" as complete`}
        onClick={onClickComplete}
      >
        {isCompleted ? <SvgInactive /> : <SvgActive />}
      </button>
      {/* i can add put action later with more data in Tasks */}
      <StyledTaskTitle isActive={task.isActive} isCompleted={isCompleted}>
        {task.title}
      </StyledTaskTitle>
      <button
        type="button"
        aria-label={`Delete task "${task.title}"`}
        onClick={onClickDelete}
      >
        <SvgX />
      </button>
    </motion.div>
  );
};

export default memo(TaskItem);
