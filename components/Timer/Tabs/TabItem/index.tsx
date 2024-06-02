import { TabType } from "@/types/Timer";
import { StyledTimerButton } from "../../styled/StyledTimer";

type TabItemType = TabType & {
  title: string;
};

const TabItem = ({ title, setSelectedTab, selectedTab }: { title: string }) => (
  <StyledTimerButton
    role="button"
    aria-pressed={title === selectedTab}
    checked={title === selectedTab}
    onClick={() => setSelectedTab(title)}
  >
    <span>{title}</span>
  </StyledTimerButton>
);

export default TabItem;
