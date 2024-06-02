import { type TabType } from "types/Timer";

import Tabs from "./Tabs";
import TabItem from "./Tabs/TabItem";
import { TABS } from "./constants";
import Clock from "./Clock";

const Timer: FC<TabType> = ({ selectedTab, setSelectedTab }) => (
  <>
    <Tabs>
      {TABS.map((item) => (
        <TabItem
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          key={item}
          title={item}
        />
      ))}
    </Tabs>
    <Clock />
  </>
);

export default Timer;
