import { useCallback, useRef, useState } from "react";

// import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
// import { StyledInnerList } from "@/components/TaskList/styled/StyledList";
// import TaskForm from "@/components/TaskList/components/forms/TaskForm";
// import TaskItem from "@/components/TaskList/components/item/TaskItem";
// import { AnimatePresence } from "framer-motion";
import TaskListButton from "@/components/TaskList/components/forms/TaskListButton";
import { useTasklist } from "@/components/contexts/TasklistContext";

import { StyledInnerList } from "@/components/TaskList/styled/StyledList";
import TaskForm from "@/components/TaskList/components/forms/TaskForm";
import useTaskButtonTransition from "./components/hooks/useTaskButtonTransition";
import { motion } from "framer-motion";

// make useResizeObserver hook for 768px disable dragging or else!
const TaskList: React.FC = () => {
  const {
    tasks: { get: getTasks, set: setTask },
    tasklistRef: { get: getTasklistRef, set: setTasklistRef },
  } = useTasklist(["tasks", "tasklistRef"]);

  const tasklistRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { ...flipProps } = useTaskButtonTransition(showAddForm);

  const flipTaskButton = useCallback(() => setShowAddForm((prev) => !prev), []);

  return (
    <StyledInnerList>
      <div className="spacing">
        {getTasks.length > 0 ? getTasks[0].title : "Time to get productive!"}
      </div>
      {getTasks.map((t) => (
        <div key={t.id}>task</div>
      ))}

      <TaskListButton
        showAddForm={showAddForm}
        flipTaskButton={flipTaskButton}
      />

      {/* {showAddForm ? (
        <TaskForm showAddForm={showAddForm} flipTaskButton={flipTaskButton} />
      ) : (
        <TaskListButton
          showAddForm={showAddForm}
          flipTaskButton={flipTaskButton}
        />
      )} */}
    </StyledInnerList>
  );
};

export default TaskList;
