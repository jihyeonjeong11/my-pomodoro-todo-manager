import { type TaskType } from "@/types/TaskList";
import createFastContext from "components/contexts/createFastContext";

export const {
  FastContextProvider: TasklistProvider,
  useFastContextFields: useTasklist,
} = createFastContext({
  tasks: [] as TaskType[],
  selectedTask: {} as TaskType,
  selectedTaskId: -1,
});
