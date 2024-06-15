import { SelectedCountdownType, type SelectedTabType } from "@/types/Timer";
import { TABS } from "../constants";

export const findTab = (title: SelectedTabType) => {
  const tab = TABS.find((t) => t.title === title);
  if (tab) {
    return tab.countdown;
  }

  throw new Error("tab not founded");
};

export const convertMsToTime = (ms: SelectedCountdownType) => {
  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedTime = `${formattedMinutes}:${formattedSeconds}`;

  return formattedTime;
};
