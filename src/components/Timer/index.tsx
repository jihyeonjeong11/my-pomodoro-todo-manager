import React, { FC } from "react";
import { type TabType } from "@/types/Timer";

import Tabs from "./Tabs";
import TabItem from "./Tabs/TabItem";
import { TABS } from "./constants";

const Timer: FC<TabType> = ({ selectedTab, setSelectedTab }) => (
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
);

export default Timer;
