import createFastContext from "components/contexts/createFastContext";
import { TimerType } from "@/types/Timer";
import { TABS, TIMER_STATUS } from "../Timer/constants";

export const {
  FastContextProvider: PomodoroProvider,
  useFastContextFields: usePomodoro,
} = createFastContext({
  title: TABS[0].title,
  isStarted: TIMER_STATUS.stopped as TimerType,
});
