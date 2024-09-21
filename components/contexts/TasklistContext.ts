import { type TaskType } from "@/types/TaskList";
import createFastContext from "components/contexts/createFastContext";

export const {
  FastContextProvider: TasklistProvider,
  useFastContextFields: useTasklist,
} = createFastContext({
  tasks: [] as TaskType[],
  tasklistRef: null as unknown as React.MutableRefObject<HTMLDivElement | null>,
});
