import type React from "react";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";

// make useResizeObserver hook for 768px disable dragging or else!
const TaskListButton: React.FC = () => {
  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(["taskWindows"]);
  const {
    tasks: { get: getTasks },
  } = useTaskWindows(["tasks"]);

  const toggleMainTaskWindow = () => {
    if (Object.prototype.hasOwnProperty.call(getTaskWindows, "main")) {
      const updatedWindows = { ...getTaskWindows };
      delete updatedWindows.main;
      setTaskWindows(updatedWindows);
    } else {
      setTaskWindows({ ...getTaskWindows, main: {} });
    }
  };

  return (
    <button type="button" onClick={toggleMainTaskWindow}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // setTasks([{ title: text }]);
        }}
      >
        <label htmlFor={getTasks[0]?.title}>
          {getTasks.length > 0 ? getTasks[0].title : "Type your tasks!"}
        </label>
      </form>
    </button>
  );
};

export default TaskListButton;
