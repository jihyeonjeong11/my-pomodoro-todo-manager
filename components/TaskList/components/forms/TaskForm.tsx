import { useState } from "react";
import { useTasklist } from "@/components/contexts/TasklistContext";

const TaskForm = () => {
  const {
    tasks: { get: getTasks, set: setTask },
  } = useTasklist(["tasks"]);
  const [text, setText] = useState<string>("");

  return (
    <form
      className="spacing"
      onSubmit={(e) => {
        e.preventDefault();
        setTask([
          {
            title: text,
            approxPomodoro: 1,
            id: getTasks.length,
            isActive: true,
          },
          ...getTasks.map((t) => ({
            ...t,
            isActive: false,
          })),
        ]);
        setText("");
      }}
    >
      <input
        placeholder="List your thought!"
        value={text}
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
