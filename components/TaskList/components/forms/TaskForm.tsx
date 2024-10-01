import {
  type ChangeEvent,
  type FormEvent,
  memo,
  useCallback,
  useState,
} from "react";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { useIndexedDB } from "@/components/contexts/IndexedDBContext";
import { setInitialTask } from "@/components/TaskList/components/functions";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { isUseLocalDBOrNot } from "@/components/common/functions";
import useTaskControl from "@/components/TaskList/components/hooks/useTaskControl";

const TaskForm = () => {
  const {
    tasks: { get: getTasks, set: setTask },
  } = useTasklist(["tasks"]);

  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(["taskWindows"]);

  const {
    db: { get: getDB },
  } = useIndexedDB(["db"]);

  const { postTask } = useTaskControl(getTasks);

  const [text, setText] = useState<string>("");

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      postTask(text, setTask);
      setText("");

      if (isUseLocalDBOrNot()) {
        if (getDB) {
          const transaction = getDB.transaction(["tasks"], "readwrite");
          const request = transaction.objectStore("tasks");
          const newRow = setInitialTask(getTasks, text);
          const add = request.add(newRow);
          add.onsuccess = () => {
            setTaskWindows({
              ...getTaskWindows,
              loader: { actionType: "refresh" },
            });
            // zod
            if (text.length > 0) {
              setText("");
            }
          };
          // eslint-disable-next-line unicorn/prefer-add-event-listener
          add.onerror = () => {
            throw new Error(add.error?.message);
          };
        } else {
          throw new Error("No DB found");
        }
      } else {
        postTask(text, setTask);
        setText("");
      }
    },
    [postTask, setTask, text, getDB, getTaskWindows, getTasks, setTaskWindows],
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
