import {
  type ChangeEvent,
  type FormEvent,
  memo,
  useCallback,
  useState,
} from "react";
import { useTasklist } from "@/components/contexts/TasklistContext";
import useTaskControl from "@/components/TaskList/components/hooks/useTaskControl";
import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import { setInitialTask } from "@/components/TaskList/components/functions";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";

const TaskForm = () => {
  const {
    tasks: { get: getTasks, set: setTask },
  } = useTasklist(["tasks"]);

  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(["taskWindows"]);

  const {
    status: { get: getStatus, set: setStatus },
    db: { get: getDB, set: setDB },
  } = useIndexedDB(["status", "db"]);

  const [text, setText] = useState<string>("");
  const { postTask } = useTaskControl(getTasks);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (getDB) {
        console.log("eiei");

        const transaction = getDB.transaction(["tasks"], "readwrite");
        const request = transaction.objectStore("tasks");
        const newRow = setInitialTask(getTasks, text);
        const add = request.add(newRow);
        add.onsuccess = () => {
          setTaskWindows({ ...getTaskWindows, loader: { isRefresher: true } });
          // loading -> refresh stuff
          // zod
          if (text.length > 0) {
            setText("");
          }
        };
        add.onerror = (error) => {
          console.log(error);
          throw new Error(error.target.result);
        };
      } else {
        throw new Error("No DB found");
      }
    },
    [getDB, getTaskWindows, getTasks, setTaskWindows, text]
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
