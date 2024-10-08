import {
  type ChangeEvent,
  type FormEvent,
  memo,
  useCallback,
  useState,
} from "react";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { useTaskControl } from "@/components/TaskList/components/hooks/useTaskControl";

const TaskForm = () => {
  const {
    tasks: { get: getTasks, set: setTask },
  } = useTasklist(["tasks"]);
  const [text, setText] = useState<string>("");
  const { postTask } = useTaskControl(getTasks);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // zod
      if (text.length > 0) {
        postTask(text, setTask);
        setText("");
      }
    },
    [postTask, setTask, text],
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
