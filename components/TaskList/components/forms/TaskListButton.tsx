import type React from "react";
import { useAnimate } from "framer-motion";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  DEFAULT_TASKFORM_HEIGHT,
  TASKFORM_PADDING,
} from "@/components/Timer/constants";

const TaskForm = dynamic(
  () => import("@/components/TaskList/components/forms/TaskForm"),
);

type Props = {
  flipTaskButton: React.MouseEventHandler<HTMLButtonElement>;
  showAddForm: boolean;
};

const TaskListButton: React.FC<Props> = ({ flipTaskButton, showAddForm }) => {
  const [scope, animate] = useAnimate();
  const [formScope, animateForm] = useAnimate<HTMLDivElement>();

  // Seperate this later revisit!
  useEffect(() => {
    const run = async (onward: boolean) => {
      const ref = formScope?.current;

      if (onward && ref) {
        const determinedHeight =
          ref.getBoundingClientRect().height || DEFAULT_TASKFORM_HEIGHT;
        await animate(
          scope.current,
          {
            height: 32 + determinedHeight + TASKFORM_PADDING, // 2rem + formHeight + padding
            justifyContent: "flex-start",
          },
          { duration: 0.1 },
        );
        await animateForm(formScope.current, { opacity: 1 }, { duration: 0.2 });
        await window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      } else {
        await animate(
          scope.current,
          { height: "2rem", justifyContent: "center", marginBottom: 0 },
          { duration: 0.3 },
        );
        await animateForm(formScope.current, { opacity: 0 }, { duration: 0.2 });
      }
    };
    if (showAddForm) {
      run(true);
    } else {
      run(false);
    }
  }, [animate, animateForm, showAddForm, scope, formScope]);

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

export default TaskListButton;
