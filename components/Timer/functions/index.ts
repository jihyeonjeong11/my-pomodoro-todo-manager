import { type SelectedTabType } from "@/types/Timer";
import { TABS } from "../constants";

export const findTab = (title: SelectedTabType) =>
  TABS.find((i) => i.title === title)!.countdown;
