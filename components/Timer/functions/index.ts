import { type TimerType, type SelectedTabType } from "@/types/Timer";
import { TABS, TIMER_STATUS } from "@/components/Timer/constants";

export const findTab = (title: SelectedTabType) => {
  const tab = TABS.find((t) => t.title === title);
  if (tab) {
    return tab;
  }

  throw new Error("tab not founded");
};

export const toggleTimer = (status: TimerType) =>
  TIMER_STATUS.stopped === status ? TIMER_STATUS.started : TIMER_STATUS.stopped;

export const convertMsToTime = (ms: number) => {
  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedTime = `${formattedMinutes}:${formattedSeconds}`;

  return formattedTime;
};

export const getFromSet = <T>(
  set: Set<T>,
  callback: (item: T) => boolean,
): T | null => {
  for (const item of set) {
    if (callback(item)) {
      return item;
    }
  }
  return null;
};
