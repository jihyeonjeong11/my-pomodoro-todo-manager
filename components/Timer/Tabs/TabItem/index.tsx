import { MutableRefObject, useCallback } from "react";
import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { SelectedTabType } from "@/types/Timer";
import { StyledTimerButton } from "../../styled/StyledTimer";

const TabItem: FC<{
  selectedTitle: SelectedTabType;
  itemRefs: MutableRefObject<Set<HTMLButtonElement>>;
}> = ({ selectedTitle, itemRefs }) => {
  const { title } = usePomodoro(["title"]);
  const isSelected = title.get === selectedTitle;

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
    [itemRefs],
  );

  return (
    <StyledTimerButton
      ref={refCallback}
      role="button"
      aria-pressed={isSelected}
      checked={isSelected}
      onClick={() => {
        title.set(selectedTitle);
      }}
    >
      <span>{selectedTitle}</span>
    </StyledTimerButton>
  );
};

export default TabItem;
