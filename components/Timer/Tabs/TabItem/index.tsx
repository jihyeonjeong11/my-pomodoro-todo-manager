import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { SelectedTabType } from "@/types/Timer";
import { StyledTimerButton } from "../../styled/StyledTimer";

const TabItem: FC<{ selectedTitle: SelectedTabType }> = ({ selectedTitle }) => {
  const { title } = usePomodoro(["title"]);

  return (
    <StyledTimerButton
      role="button"
      aria-pressed={title.get === selectedTitle}
      checked={title.get === selectedTitle}
      onClick={() => {
        title.set(selectedTitle);
      }}
    >
      <span>{selectedTitle}</span>
    </StyledTimerButton>
  );
};

export default TabItem;
