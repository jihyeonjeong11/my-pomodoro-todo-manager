import { type SelectedTabType } from "@/types/Timer";

const TabItem: FC<{
  selectedTitle: SelectedTabType;
  onClick: (selectedTitle: SelectedTabType) => void;
  isSelected: boolean;
}> = ({ selectedTitle, onClick, isSelected }) => (
  <li className={`tab-item ${isSelected ? "tab-highlight" : ""}`}>
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onClick(selectedTitle)}
    >
      <span>{selectedTitle}</span>
    </button>
  </li>
);
export default TabItem;
