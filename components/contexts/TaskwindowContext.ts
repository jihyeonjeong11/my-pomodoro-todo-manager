import { type TaskType } from "@/types/TaskList";
import createFastContext from "components/contexts/createFastContext";

export const {
  FastContextProvider: TaskWindowsProvider,
  useFastContextFields: useTaskWindows,
} = createFastContext({
  taskWindows: {} as Record<"main" | string, any>,
  tasks: [] as TaskType[],
});
