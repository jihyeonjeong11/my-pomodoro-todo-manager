import Tabs from "./Tabs";
import TabItem from "./Tabs/TabItem";
import { TABS } from "./constants";
import Clock from "./Clock";

const Timer: FC = () => (
  <>
    <Tabs>
      {TABS.map((item, index) => (
        <TabItem
          data-testid={`tab-item-${index}`}
          key={item.title}
          selectedTitle={item.title}
        />
      ))}
    </Tabs>
    <Clock />
  </>
);
export default Timer;
