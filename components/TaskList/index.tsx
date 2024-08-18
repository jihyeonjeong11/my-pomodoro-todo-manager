import type React from "react";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import TaskForm from "./components/forms/TaskForm";

// make useResizeObserver hook for 768px disable dragging or else!
const TaskList: React.FC = () => {
  const {
    tasks: { get, set },
  } = useTaskWindows(["tasks"]);

  return (
    <>
      <TaskForm />
      {get.map((i) => {
        return <div>{i.title}</div>;
      })}
    </>
  );
};

export default TaskList;
