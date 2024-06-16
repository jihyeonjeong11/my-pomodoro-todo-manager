import { TABS, TIMER_STATUS } from "@/components/Timer/constants";

export type SelectedTabType = (typeof TABS)[number]["title"];
export type SelectedCountdownType = (typeof TABS)[number]["countdown"];

export type TimerType = keyof typeof TIMER_STATUS;
