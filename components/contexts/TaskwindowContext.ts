import { type TaskWindowType } from "@/types/global";
import createFastContext from "components/contexts/createFastContext";

export const {
  FastContextProvider: TaskWindowsProvider,
  useFastContextFields: useTaskWindows,
} = createFastContext({
  taskWindows: {} as TaskWindowType,
});
