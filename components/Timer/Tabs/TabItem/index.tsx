import { type SelectedTabType } from "@/types/Timer";
import { motion } from "framer-motion";

const TabItem: FC<{
  selectedTitle: SelectedTabType;
  onClick: (selectedTitle: SelectedTabType) => void;
  isSelected: boolean;
}> = ({ selectedTitle, onClick, isSelected }) => (
  <div className="tab-item">
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onClick(selectedTitle)}
    >
      <span>{selectedTitle}</span>
    </button>
    {isSelected && (
      <motion.div className="tab-highlight" layoutId="active-highlight" />
    )}
  </div>
);
export default TabItem;
