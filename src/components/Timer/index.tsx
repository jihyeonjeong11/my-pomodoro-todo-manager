import React from "react";
import Tabs from "./Tabs";
import TabItem from "./Tabs/TabItem";

const TABS = ["pomodoro", "short break", "long break"];

const Timer = ({ selectedTab, setSelectedTab }) => (
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
