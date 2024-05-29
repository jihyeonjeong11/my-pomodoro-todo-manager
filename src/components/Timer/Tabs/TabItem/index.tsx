import React from "react";
import { StyledTimerButton } from "../../styled/StyledTimer";

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
