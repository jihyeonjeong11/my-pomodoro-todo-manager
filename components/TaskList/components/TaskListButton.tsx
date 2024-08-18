import type React from "react";
import { useState } from "react";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";

// make useResizeObserver hook for 768px disable dragging or else!
const TaskListButton: React.FC = () => {
  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(["taskWindows"]);

  const toggleMainTaskWindow = () => {
    if (Object.prototype.hasOwnProperty.call(getTaskWindows, "main")) {
      const updatedWindows = { ...getTaskWindows };
      delete updatedWindows.main;
      setTaskWindows(updatedWindows);
    } else {
      setTaskWindows({ ...getTaskWindows, main: {} });
    }
  };

  const [tasks, setTasks] = useState<{ title: string }[]>([]);
  const [text, setText] = useState<string>("");
  return (
    <button type="button" onClick={toggleMainTaskWindow}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTasks([{ title: text }]);
        }}
      >
        <label htmlFor={tasks[0]?.title}>
          {tasks.length > 0 ? tasks[0].title : "Type your tasks!"}
        </label>
        <input onChange={(e) => setText(e.target.value)} type="text" />
      </form>
    </button>
  );
};

export default TaskListButton;
