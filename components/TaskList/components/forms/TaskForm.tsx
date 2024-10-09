import {
  type ChangeEvent,
  type FormEvent,
  memo,
  useCallback,
  useState,
} from "react";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import useTaskControl from "@/components/TaskList/components/hooks/useTaskControl";
import useIndexedDBControl from "@/components/common/hooks/useIndexedDBControl";

const TaskForm = () => {
  const {
    tasks: { get: getTasks, set: setTask },
    selectedTask: { set: setSelectedTask },
  } = useTasklist(["tasks", "selectedTask"]);

  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(["taskWindows"]);

  const {
    db: { get: getDB },
  } = useIndexedDB(["db"]);

  const { postTask } = useTaskControl(getTasks);
  const { postATaskToDB } = useIndexedDBControl(
    getDB,
    setTask,
    setSelectedTask,
    getTaskWindows,
    setTaskWindows,
  );

  const [text, setText] = useState<string>("");

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      postTask(text, setTask);
      postATaskToDB(getTasks, text);
      setText("");
    },
    [postTask, text, setTask, postATaskToDB, getTasks],
  );

  const onType = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setText(e.target.value);
  }, []);

  return (
    <form data-testid="task-form" className="spacing" onSubmit={onSubmit}>
      <input
        placeholder="List your thought!"
        value={text}
        onChange={onType}
        type="text"
      />
    </form>
  );
};

export default memo(TaskForm);
