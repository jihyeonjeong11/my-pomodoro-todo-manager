import { MutableRefObject, useCallback } from "react";
import { SelectedTabType } from "@/types/Timer";
import { StyledTimerHighlight } from "../../styled/StyledTimer";

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
    <div className="tab-item">
      <button
        ref={refCallback}
        role="button"
        aria-pressed={isSelected}
        onClick={(e) => onClick(e, selectedTitle)}
      >
        <span>{selectedTitle}</span>
      </button>
    </div>
  );
};

export default TabItem;
