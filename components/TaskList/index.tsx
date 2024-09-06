import { useCallback, useRef } from "react";
import TaskListButton from "@/components/TaskList/components/forms/TaskListButton";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { StyledInnerList } from "@/components/TaskList/styled/StyledList";
import TaskItem from "@/components/TaskList/components/item/TaskItem";
import TaskItems from "@/components/TaskList/components/item";
import { useToggle } from "@/components/common/hooks/useToggle";

// make useResizeObserver hook for 768px disable dragging or else!
const TaskList: React.FC = () => {
  const {
    tasks: { get: getTasks, set: setTask },
    tasklistRef: { get: getTasklistRef, set: setTasklistRef },
  } = useTasklist(["tasks", "tasklistRef"]);

  const tasklistRef = useRef(null);
  const [showAddForm, flipTaskButton] = useToggle(false);

  const removeTask = useCallback(
    (id: number) => {
      setTask(getTasks.filter((t) => t.id !== id));
    },
    [getTasks, setTask]
  );

  const activeTask = useCallback(
    (id: number) =>
      setTask(
        getTasks.map((t) =>
          t.id === id ? { ...t, isActive: true } : { ...t, isActive: false }
        )
      ),
    [getTasks, setTask]
  );

  return (
    <StyledInnerList>
      <div className="spacing">
        {getTasks.length > 0 && "Time to get productive!"}
      </div>
      <TaskItems>
        {getTasks.map((t) => (
          <TaskItem
            key={t.id}
            removeTask={removeTask}
            activeTask={activeTask}
            task={t}
          />
        ))}
      </TaskItems>
      <div className="spacing" />
      <TaskListButton
        showAddForm={showAddForm}
        flipTaskButton={flipTaskButton}
      />
    </StyledInnerList>
  );
};

export default TaskList;
