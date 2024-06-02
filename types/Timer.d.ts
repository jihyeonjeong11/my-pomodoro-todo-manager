import { Dispatch, SetStateAction } from "react";
import { TABS } from "components/Timer/Tabs";

type SelectedTab = keyof typeof TABS;
type SetSelectedTab = Dispatch<SetStateAction<keyof TABS>>;

type TabType = {
  selectedTab: SelectedTab;
  setSelectedTab: SetSelectedTab;
};
