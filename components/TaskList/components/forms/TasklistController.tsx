import { useAnimate } from "framer-motion";
import dynamic from "next/dynamic";
import useTaskListButtonTransition from "@/components/TaskList/components/hooks/useTaskButtonTransition";
import useToggle from "@/components/common/hooks/useToggle";

const TaskForm = dynamic(
  () => import("@/components/TaskList/components/forms/TaskForm"),
);

const TaskListController = () => {
  const [showAddForm, flipTaskButton] = useToggle(false);

  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [formScope, formAnimate] = useAnimate<HTMLDivElement>();
  useTaskListButtonTransition(
    showAddForm,
    scope,
    formScope,
    animate,
    formAnimate,
  );

  return (
    <div ref={scope} className="motion-button">
      <button
        data-testid="tasklist-button"
        onClick={flipTaskButton}
        type="button"
        title="Click this for add new task"
      >
        <h3>Add New task</h3>
      </button>
      <div style={{ opacity: 0 }} ref={formScope}>
        {showAddForm && <TaskForm />}
      </div>
    </div>
  );
};

export default TaskListController;
