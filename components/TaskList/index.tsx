import type React from "react";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { StyledInnerList } from "@/components/TaskList/styled/StyledList";
import TaskForm from "@/components/TaskList/components/forms/TaskForm";
import TaskItem from "@/components/TaskList/components/item/TaskItem";
import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";

// make useResizeObserver hook for 768px disable dragging or else!
const TaskList: React.FC = () => {
  const {
    tasks: { get: getTask, set: setTask },
  } = useTaskWindows(["tasks"]);

  const removeTask = useCallback(
    (id: number) => {
      setTask(getTask.filter((item) => item.id !== id));
    },
    [getTask, setTask],
  );

  return (
    <StyledInnerList>
      <TaskForm />
      <ul>
        <AnimatePresence>
          {getTask.map((task) => (
            <li key={`task-${task.id}`}>
              <TaskItem task={task} removeTask={removeTask} />
            </li>
          ))}
        </AnimatePresence>
      </ul>
    </StyledInnerList>
  );
};

export default TaskList;
