import { type SelectedTabType } from "@/types/Timer";
import { TABS } from "../constants";

export const findTab = (title: SelectedTabType) => {
  const tab = TABS.find((t) => t.title === title);
  if (tab) {
    return tab.countdown;
  }

  throw new Error("tab not founded");
};
