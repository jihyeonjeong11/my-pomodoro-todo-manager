import { useCallback, useRef, useState } from "react";
import TaskListButton from "@/components/TaskList/components/forms/TaskListButton";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { StyledInnerList } from "@/components/TaskList/styled/StyledList";
import TaskItem from "./components/item/TaskItem";
import TaskItems from "./components/item";

// make useResizeObserver hook for 768px disable dragging or else!
const TaskList: React.FC = () => {
  const {
    tasks: { get: getTasks, set: setTask },
    tasklistRef: { get: getTasklistRef, set: setTasklistRef },
  } = useTasklist(["tasks", "tasklistRef"]);

  const tasklistRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const flipTaskButton = useCallback(() => setShowAddForm((prev) => !prev), []);

  const removeTask = useCallback(
    (id: number) =>
      setTimeout(() => setTask(getTasks.filter((t) => t.id !== id)), 0.5),
    [getTasks, setTask]
  );

  return (
    <StyledInnerList>
      <div className="spacing">
        {getTasks.length > 0 && "Time to get productive!"}
      </div>
      <TaskItems>
        {getTasks.map((t) => (
          <TaskItem key={t.id} removeTask={removeTask} task={t} />
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
