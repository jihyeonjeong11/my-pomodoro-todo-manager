import { useCallback } from "react";
import TaskListButton from "@/components/TaskList/components/forms/TaskListButton";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { StyledInnerList } from "@/components/TaskList/styled/StyledList";
import TaskItem from "@/components/TaskList/components/item/TaskItem";
import { useToggle } from "@/components/common/hooks/useToggle";
import { AnimatePresence, Reorder } from "framer-motion";

// make useResizeObserver hook for 768px disable dragging or else!
const TaskList: React.FC = () => {
  const {
    tasks: { get: getTasks, set: setTask },
  } = useTasklist(["tasks", "tasklistRef"]);

  const [showAddForm, flipTaskButton] = useToggle(false);

  const removeTask = useCallback(
    (id: number) => {
      setTask(getTasks.filter((t) => t.id !== id));
    },
    [getTasks, setTask],
  );

  const activeTask = useCallback(
    (id: number) =>
      setTask(
        getTasks.map((t) =>
          t.id === id ? { ...t, isActive: true } : { ...t, isActive: false },
        ),
      ),
    [getTasks, setTask],
  );

  return (
    <StyledInnerList>
      <div className="spacing">
        {getTasks.length > 0 && "Time to get productive!"}
      </div>
      <Reorder.Group axis="y" values={getTasks} onReorder={setTask}>
        <AnimatePresence>
          {getTasks.map((t) => (
            <Reorder.Item key={`task-${t.id}`} value={t}>
              <TaskItem
                removeTask={removeTask}
                activeTask={activeTask}
                task={t}
              />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <div className="spacing" />
      <TaskListButton
        showAddForm={showAddForm}
        flipTaskButton={flipTaskButton}
      />
    </StyledInnerList>
  );
};

export default TaskList;
