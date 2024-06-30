import { MutableRefObject, useCallback } from "react";
import { SelectedTabType } from "@/types/Timer";

const TabItem: FC<{
  selectedTitle: SelectedTabType;
  itemRefs: MutableRefObject<Set<HTMLDivElement>>;
  onClick: any;
  isSelected: boolean;
}> = ({ selectedTitle, itemRefs, onClick, isSelected }) => {
  const refCallback = useCallback(
    (element: HTMLDivElement | null) => {
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
    <div ref={refCallback} className="tab-item">
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={(e) => onClick(e, selectedTitle)}
      >
        <span>{selectedTitle}</span>
      </button>
    </div>
  );
};

export default TabItem;
