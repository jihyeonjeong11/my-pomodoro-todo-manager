import type React from "react";
import { useAnimate, useInView } from "framer-motion";
import useTaskButtonTransition from "@/components/TaskList/components/hooks/useTaskButtonTransition";
import { useEffect } from "react";
import TaskForm from "@/components/TaskList/components/forms/TaskForm";

type Props = {
  flipTaskButton: React.MouseEventHandler<HTMLButtonElement>;
  showAddForm: boolean;
};

const TaskListButton: React.FC<Props> = ({ flipTaskButton, showAddForm }) => {
  const flipProps = useTaskButtonTransition(showAddForm);
  const [scope, animate] = useAnimate();
  const [formScope, animateForm] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    const run = async (onward: boolean) => {
      if (isInView) {
        formScope.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          margin: "100px 0px 0px 0px",
        });
      }
      if (onward) {
        await animate(
          scope.current,
          { height: "12rem", justifyContent: "flex-start" },
          { duration: 0.1 }
        );
        await animateForm(formScope.current, { opacity: 1 }, { duration: 0.2 });
      } else {
        await animate(
          scope.current,
          { height: "2rem", justifyContent: "center" },
          { duration: 0.3 }
        );
        await animateForm(formScope.current, { opacity: 0 }, { duration: 0.2 });
      }
    };
    if (showAddForm) {
      run(true);
    } else {
      run(false);
    }
  }, [
    animate,
    animateForm,
    flipProps,
    showAddForm,
    scope,
    formScope,
    isInView,
  ]);

  return (
    <div ref={scope} className="motion-button">
      <button
        onClick={flipTaskButton}
        type="button"
        title="Click this for add new task"
      >
        <h3>Add New task</h3>
      </button>
      <div style={{ opacity: 0 }} ref={formScope}>
        {showAddForm && (
          <TaskForm showAddForm={showAddForm} flipTaskButton={flipTaskButton} />
        )}
      </div>
    </div>
  );
};

export default TaskListButton;
