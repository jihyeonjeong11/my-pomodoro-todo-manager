import type React from "react";
import { useState } from "react";

// make useResizeObserver hook for 768px disable dragging or else!
const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<{ title: string }[]>([]);
  const [text, setText] = useState<string>("");
  return (
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
  );
};

export default TaskList;
