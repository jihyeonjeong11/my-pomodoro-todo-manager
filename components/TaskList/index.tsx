import TasklistController from "@/components/TaskList/components/forms/TasklistController";
import { useTasklist } from "@/components/contexts/TasklistContext";
import {
  StyledInnerList,
  StyledList,
} from "@/components/TaskList/styled/StyledList";
import { AnimatePresence, Reorder } from "framer-motion";
import dynamic from "next/dynamic";
import { type TaskType } from "@/types/TaskList";
import useIndexedDBControl from "@/components/common/hooks/useIndexedDBControl";
import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import { useCallback, type MouseEvent } from "react";
import useTaskControl from "@/components/TaskList/components/hooks/useTaskControl";
import {
  filterTask,
  toggleCompleteTask,
} from "@/components/TaskList/components/functions";

const TaskItem = dynamic(
  () => import("@/components/TaskList/components/item/TaskItem"),
);

const TaskList = () => {
  const {
    tasks: { get: getTasks, set: setTask },
    selectedTask: { get: getSelectedTask, set: setSelectedTask },
  } = useTasklist(["tasks", "selectedTask"]);

  const {
    db: { get: getDB },
  } = useIndexedDB(["status", "db"]);

  const { deleteTask, completeTask, activateOrReactivateTask } =
    useTaskControl(getTasks);

  const {
    putOrPostOrder,
    deleteATaskFromDB,
    putATaskCompletedToDB,
    putATaskActiveToDB,
  } = useIndexedDBControl(getDB, setTask);

  const onReorder = useCallback(
    (newOrderedTasks: TaskType[]) => {
      setTask(newOrderedTasks);
      putOrPostOrder(newOrderedTasks);
    },
    [putOrPostOrder, setTask],
  );

  const onClickDelete = useCallback(
    (task: TaskType) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      deleteATaskFromDB(task);
      deleteTask(task.id, setTask);
    },
    [deleteATaskFromDB, deleteTask, setTask],
  );
  const onClickComplete = useCallback(
    (task: TaskType) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      putATaskCompletedToDB(task);
      putOrPostOrder([
        ...filterTask(getTasks, task.id),
        toggleCompleteTask(getTasks, task.id),
      ]);
      completeTask(task.id, setTask);
    },
    [completeTask, getTasks, putATaskCompletedToDB, putOrPostOrder, setTask],
  );

  const onClickActive = useCallback(
    (task: TaskType) => () => {
      putATaskActiveToDB(task);
      activateOrReactivateTask(task.id, task.isCompleted, setSelectedTask);
    },
    [putATaskActiveToDB, activateOrReactivateTask, setSelectedTask],
  );

  return (
    <StyledList>
      <StyledInnerList>
        <div className="spacing">
          {getTasks.length > 0 && "Time to get productive!"}
        </div>
        <Reorder.Group axis="y" values={getTasks} onReorder={onReorder}>
          <AnimatePresence>
            {getTasks.map((t) => (
              <Reorder.Item
                data-testid={`task-${t.id}`}
                key={`task-${t.id}`}
                value={t}
              >
                <TaskItem
                  task={t}
                  getSelectedTask={getSelectedTask}
                  onClickDelete={onClickDelete(t)}
                  onClickComplete={onClickComplete(t)}
                  onClickActive={onClickActive(t)}
                />
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
        <div className="spacing" />
        <TasklistController />
        <div className="spacing" />
      </StyledInnerList>
    </StyledList>
  );
};

export default TaskList;
