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
      }}
    >
      <label htmlFor={getTasks[0]?.title}>
        {getTasks.length > 0
          ? `current: ${getTasks[0].title} `
          : "Fire your focus!"}
      </label>
      <input
        placeholder="List your thought!"
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
