import { type MutableRefObject, useRef, useCallback, useState, useEffect } from "react";
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

	const [animationStyle, setAnimationStyle] = useState({});

	const onClick = useCallback(
		(e: MouseEvent, selectedTitle: SelectedTabType) => {
			if (e?.currentTarget && itemRefs.current.has(e.currentTarget as HTMLButtonElement)) {
				const found = getFromSet(itemRefs.current, (ele) => ele === e.currentTarget);
				const prev = getFromSet(itemRefs.current, (ele) => ele.textContent === get.title);
				if (!found || !prev) {
					throw new Error("must be element");
				}
				const transformRange = found.offsetLeft - prev.offsetLeft;

				setAnimationStyle({
					transform: `translateX(${transformRange}px)`,
					transition: "transform 0.3s ease-in-out",
				});

				setTimeout(() => {
					setAnimationStyle({});
				}, 300);

				set(findTab(selectedTitle));
			}
		},
		[set, get.title]
	);

	useEffect(() => {
		const prevElement = getFromSet(itemRefs.current, (ele) => ele.textContent === get.title);
		if (prevElement) {
			Object.assign(prevElement.style, animationStyle);
		}
	}, [animationStyle, get.title]);

	return (
		<>
			<Tabs>
				{TABS.map((item, index) => {
					const isSelected = item.title === get.title;
					return <TabItem onClick={onClick} itemRefs={itemRefs} data-testid={`tab-item-${index}`} key={item.title} selectedTitle={item.title} isSelected={isSelected} />;
				})}
			</Tabs>
			<Clock />
		</>
	);
};

export default Timer;
