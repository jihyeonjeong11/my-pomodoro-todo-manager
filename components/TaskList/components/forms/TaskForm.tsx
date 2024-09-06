import { useState } from "react";
import { motion } from "framer-motion";
import { useTasklist } from "@/components/contexts/TasklistContext";
import useTaskButtonTransition from "@/components/TaskList/components/hooks/useTaskButtonTransition";

const TaskForm = ({ showAddForm, flipTaskButton }) => {
  const flipProps = useTaskButtonTransition(showAddForm);
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
          { title: text, approxPomodoro: 1, id: getTasks.length },
          ...getTasks,
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
