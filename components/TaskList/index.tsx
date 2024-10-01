import TaskListButton from "@/components/TaskList/components/forms/TaskListButton";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { StyledInnerList } from "@/components/TaskList/styled/StyledList";
import useToggle from "@/components/common/hooks/useToggle";
import { AnimatePresence, Reorder } from "framer-motion";
import dynamic from "next/dynamic";

const TaskItem = dynamic(
  () => import("@/components/TaskList/components/item/TaskItem"),
);

const TaskList = () => {
  const {
    tasks: { get: getTasks, set: setTask },
  } = useTasklist(["tasks"]);

  const [showAddForm, flipTaskButton] = useToggle(false);

  return (
    <StyledInnerList>
      <div className="spacing">
        {getTasks.length > 0 && "Time to get productive!"}
      </div>
      <Reorder.Group axis="y" values={getTasks} onReorder={setTask}>
        <AnimatePresence>
          {getTasks.map((t) => (
            <Reorder.Item
              data-testid={`task-${t.id}`}
              key={`task-${t.id}`}
              value={t}
            >
              <TaskItem task={t} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <div className="spacing" />
      <TaskListButton
        showAddForm={showAddForm}
        flipTaskButton={flipTaskButton}
      />
      <div className="spacing" />
    </StyledInnerList>
  );
};

export default TaskList;
