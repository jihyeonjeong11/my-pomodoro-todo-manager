import createFastContext from "components/contexts/createFastContext";
import { SelectedTabType, TimerType } from "@/types/Timer";
import { TABS, TIMER_STATUS } from "../Timer/constants";

export const {
  FastContextProvider: PomodoroProvider,
  useFastContextFields: usePomodoro,
} = createFastContext({
  title: TABS[0].title as SelectedTabType,
  isStarted: TIMER_STATUS.stopped as TimerType,
});
