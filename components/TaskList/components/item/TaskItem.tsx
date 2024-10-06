import { SvgActive, SvgInactive, SvgX } from "@/public/media/icons";
import { motion } from "framer-motion";
import { memo, useCallback, type MouseEvent } from "react";
import useTaskItemTransition from "@/components/TaskList/components/hooks/useTaskItemTransition";
import { type TaskType } from "@/types/TaskList";
import { StyledTaskTitle } from "@/components/TaskList/styled/StyledList";
import { useTasklist } from "@/components/contexts/TasklistContext";
import useTaskControl from "@/components/TaskList/components/hooks/useTaskControl";
import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import { isUseLocalDBOrNot } from "@/components/common/functions";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";

const TaskItem = ({ task }: { task: TaskType }) => {
  const {
    tasks: { get: getTasks, set: setTask },
    selectedTask: { get: getSelectedTask, set: setSelectedTask },
  } = useTasklist(["tasks", "selectedTask"]);
  const motionProps = useTaskItemTransition();

  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(["taskWindows"]);

  const {
    db: { get: getDB },
  } = useIndexedDB(["db"]);

  const { deleteTask, completeTask, activateOrReactivateTask } =
    useTaskControl(getTasks);

  const isCompleted = task.leftSecs === 0;

  const onClickActive = useCallback(() => {
    activateOrReactivateTask(task.id, isCompleted, setSelectedTask);
  }, [setSelectedTask, task.id, isCompleted, activateOrReactivateTask]);

  const onClickDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (isUseLocalDBOrNot()) {
        if (getDB) {
          const transaction = getDB.transaction(["tasks"], "readwrite");
          const request = transaction.objectStore("tasks").delete(task.id);

          request.onsuccess = () => {
            setTaskWindows({
              ...getTaskWindows,
              loader: { actionType: "refresh" },
            });

            // zod
          };
          // eslint-disable-next-line unicorn/prefer-add-event-listener
          request.onerror = () => {
            throw new Error(request.error?.message);
          };
        } else {
          throw new Error("No DB found");
        }
      } else {
        deleteTask(task.id, setTask);
      }
    },
    [deleteTask, getDB, getTaskWindows, setTask, setTaskWindows, task.id],
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
        data-testid={`task-${task.id}-complete`}
        type="button"
        aria-label={`Mark task "${task.title}" as complete`}
        onClick={onClickComplete}
      >
        {isCompleted ? <SvgInactive /> : <SvgActive />}
      </button>
      {/* i can add put action later with more data in Tasks */}
      <StyledTaskTitle
        $isactive={getSelectedTask.id === task.id}
        $iscompleted={isCompleted}
      >
        {task.title} {task.pomodoroCount}
      </StyledTaskTitle>
      <button
        data-testid={`task-${task.id}-remove`}
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
