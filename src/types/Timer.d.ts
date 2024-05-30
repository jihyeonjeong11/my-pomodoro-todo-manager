import { TABS } from "@/components/Timer/constants";
import { Dispatch, SetStateAction } from "react";

type SelectedTab = keyof typeof TABS;
type SetSelectedTab = Dispatch<SetStateAction<SelectedTab>>;

type TabType = {
  selectedTab: SelectedTab;
  setSelectedTab: SetSelectedTab;
};
