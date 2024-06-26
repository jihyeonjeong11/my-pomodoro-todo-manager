import { type MutableRefObject, useRef } from "react";
import Tabs from "./Tabs";
import TabItem from "./Tabs/TabItem";
import { TABS } from "./constants";
import Clock from "./Clock";

const Timer: FC = () => {
  const timerRef = useRef<MutableRefObject<HTMLObjectElement>>(null);
  const itemRefs: MutableRefObject<Set<HTMLButtonElement>> = useRef(new Set());

  return (
    <>
      <Tabs ref={timerRef}>
        {TABS.map((item, index) => (
          <TabItem
            itemRefs={itemRefs}
            data-testid={`tab-item-${index}`}
            key={item.title}
            selectedTitle={item.title}
          />
        ))}
      </Tabs>
      <Clock />
    </>
  );
};
export default Timer;
