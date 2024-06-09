import { type SelectedTabType } from "@/types/Timer";
import createFastContext from "components/contexts/createFastContext";

export const {
  FastContextProvider: PomodoroProvider,
  useFastContextFields: usePomodoro,
} = createFastContext({
  title: "pomodoro" as SelectedTabType,
});
