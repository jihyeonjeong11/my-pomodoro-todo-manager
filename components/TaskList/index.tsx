import { useCallback, useRef, useState } from "react";
import TaskListButton from "@/components/TaskList/components/forms/TaskListButton";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { StyledInnerList } from "@/components/TaskList/styled/StyledList";

// make useResizeObserver hook for 768px disable dragging or else!
const TaskList: React.FC = () => {
  const {
    tasks: { get: getTasks, set: setTask },
    tasklistRef: { get: getTasklistRef, set: setTasklistRef },
  } = useTasklist(["tasks", "tasklistRef"]);

  const tasklistRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const flipTaskButton = useCallback(() => setShowAddForm((prev) => !prev), []);

  return (
    <StyledInnerList>
      <div className="spacing">
        {getTasks.length > 0 ? getTasks[0].title : "Time to get productive!"}
      </div>
      {getTasks.map((t) => (
        <div key={t.id}>task</div>
      ))}
      <TaskListButton
        showAddForm={showAddForm}
        flipTaskButton={flipTaskButton}
      />
    </StyledInnerList>
  );
};

export default TaskList;
