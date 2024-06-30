import createFastContext from "components/contexts/createFastContext";
import { type TabWithMutableCountdown, type TimerType } from "@/types/Timer";
import { TABS, TIMER_STATUS } from "../Timer/constants";

export const {
  FastContextProvider: PomodoroProvider,
  useFastContextFields: usePomodoro,
} = createFastContext({
  tab: TABS[0] as TabWithMutableCountdown,
  isStarted: TIMER_STATUS.stopped as TimerType,
  time: TABS[0].countdown as number,
});
