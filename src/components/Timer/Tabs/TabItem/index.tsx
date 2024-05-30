import React from "react";
import { TabType } from "@/types/Timer";
import { StyledTimerButton } from "../../styled/StyledTimer";

type TabItemType = TabType & {
  title: string;
};

const TabItem = ({ title, setSelectedTab, selectedTab }: { title: string }) => {
  return (
    <StyledTimerButton
      checked={title === selectedTab}
      onClick={() => setSelectedTab(title)}
    >
      <h2>{title}</h2>
    </StyledTimerButton>
  );
};

export default TabItem;
