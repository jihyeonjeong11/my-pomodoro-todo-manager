import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { SelectedTabType } from "@/types/Timer";
import { StyledTimerButton } from "../../styled/StyledTimer";

const TabItem: FC<{ selectedTitle: SelectedTabType }> = ({ selectedTitle }) => {
  const { title } = usePomodoro(["title"]);
  const isSelected = title.get === selectedTitle;

  return (
    <StyledTimerButton
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
