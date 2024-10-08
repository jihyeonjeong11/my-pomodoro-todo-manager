import type React from "react";
import { useAnimate } from "framer-motion";
import dynamic from "next/dynamic";
import useTaskListButtonAnimation from "@/components/TaskList/components/hooks/useTaskButtonTransition";

const TaskForm = dynamic(
  () => import("@/components/TaskList/components/forms/TaskForm")
);

type Props = {
  flipTaskButton: React.MouseEventHandler<HTMLButtonElement>;
  showAddForm: boolean;
};

const TaskListController: React.FC<Props> = ({
  flipTaskButton,
  showAddForm,
}) => {
  const [scope, animate] = useAnimate();
  const [formScope] = useAnimate<HTMLDivElement>();
  useTaskListButtonAnimation(showAddForm, scope, formScope, animate);

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
