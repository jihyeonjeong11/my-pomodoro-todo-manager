import { type MutableRefObject, useRef, useCallback } from "react";
import { type SelectedTabType } from "@/types/Timer";
import Tabs from "./Tabs";
import TabItem from "./Tabs/TabItem";
import { TABS } from "./constants";
import Clock from "./Clock";
import { findTab, getFromSet } from "./functions";
import { usePomodoro } from "../contexts/PomodoroContext";

const Timer: FC = () => {
	const timerRef = useRef<MutableRefObject<HTMLObjectElement>>(null);
	const itemRefs: MutableRefObject<Set<HTMLButtonElement>> = useRef(new Set());
	const {
		tab: { set, get },
	} = usePomodoro(["tab"]);

	const onClick = useCallback(
		(e: MouseEvent, selectedTitle: SelectedTabType) => {
			const prev = get.title;
			if (e?.currentTarget && itemRefs.current.has(e.currentTarget as HTMLButtonElement)) {
				const found = getFromSet(itemRefs.current, e.currentTarget);
				let prev = null;
				for (const i of itemRefs.current) {
					console.log(i.textContent, get.title);
					if (i.textContext === get.title) {
						console.log("hello");
						prev = i;
					}
				}
				console.log(prev);
				set(findTab(selectedTitle));
			}
		},
		[set]
	);

	return (
		<>
			<Tabs>
				{TABS.map((item, index) => (
					<TabItem onClick={onClick} itemRefs={itemRefs} data-testid={`tab-item-${index}`} key={item.title} selectedTitle={item.title} />
				))}
			</Tabs>
			<Clock />
		</>
	);
};
export default Timer;
