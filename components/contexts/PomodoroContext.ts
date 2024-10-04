import createFastContext from "components/contexts/createFastContext";
import { type TabWithMutableCountdown } from "@/types/Timer";
import { TABS } from "@/components/Timer/constants";

export const {
  FastContextProvider: PomodoroProvider,
  useFastContextFields: usePomodoro,
} = createFastContext({
  tab: TABS[0] as TabWithMutableCountdown,
});
