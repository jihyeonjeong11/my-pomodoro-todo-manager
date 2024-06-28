import { MutableRefObject, useCallback } from "react";
import { SelectedTabType } from "@/types/Timer";
import { StyledTimerButton } from "../../styled/StyledTimer";

const TabItem: FC<{
	selectedTitle: SelectedTabType;
	itemRefs: MutableRefObject<Set<HTMLButtonElement>>;
	onClick: any;
	isSelected: boolean;
}> = ({ selectedTitle, itemRefs, onClick, isSelected }) => {
	const refCallback = useCallback(
		(element: HTMLButtonElement | null) => {
			if (element) {
				itemRefs.current.add(element);
			} else {
				itemRefs.current.forEach((ref) => {
					if (!ref.isConnected) {
						itemRefs.current.delete(ref);
					}
				});
			}
		},
		[itemRefs]
	);

	return (
		<div className="tab-container">
			<StyledTimerButton ref={refCallback} role="button" aria-pressed={isSelected} checked={isSelected} onClick={(e) => onClick(e, selectedTitle)}>
				<span>{selectedTitle}</span>
			</StyledTimerButton>
		</div>
	);
};

export default TabItem;
