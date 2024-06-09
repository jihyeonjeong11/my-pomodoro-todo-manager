import Timer from "@/components/Timer";
import { StyledTimer } from "./Timer/styled/StyledTimer";
import { PomodoroProvider } from "./contexts/PomodoroContext";

// spa main
const MainPage = () => (
  <PomodoroProvider>
    <StyledTimer>
      <h1>Pomodoro timer</h1>
      <Timer />
    </StyledTimer>
  </PomodoroProvider>
);
export default MainPage;
