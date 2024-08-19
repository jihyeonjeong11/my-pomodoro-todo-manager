import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { useState } from "react";

const TaskForm = () => {
  const {
    tasks: { get: getTasks, set: setTasks },
  } = useTaskWindows(["tasks"]);
  const [text, setText] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTasks([...getTasks, { title: text }]);
      }}
    >
      <label htmlFor={getTasks[0]?.title}>
        {getTasks.length > 0 ? getTasks[0].title : "Type your tasks!"}
      </label>
      <input
        onChange={(e) => {
          e.stopPropagation();
          setText(e.target.value);
        }}
        type="text"
      />
    </form>
  );
};

export default TaskForm;
