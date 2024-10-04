import { type SelectedTabType } from "@/types/Timer";
import { motion } from "framer-motion";
import { memo } from "react";

const TabItem: FC<{
  selectedTitle: SelectedTabType;
  onClickTabItem: (selectedTitle: SelectedTabType) => void;
  isSelected: boolean;
}> = ({ selectedTitle, onClickTabItem, isSelected }) => (
  <div className="tab-item">
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onClickTabItem(selectedTitle)}
    >
      <span>{selectedTitle}</span>
    </button>
    {isSelected && (
      <motion.div className="tab-highlight" layoutId="active-highlight" />
    )}
  </div>
);
export default memo(TabItem);
