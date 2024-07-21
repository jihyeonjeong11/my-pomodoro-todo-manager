import Timer from "@/components/Timer";
import { StyledTimer } from "./Timer/styled/StyledTimer";
import { PomodoroProvider } from "./contexts/PomodoroContext";
import { ErrorBoundary } from "./ErrorBoundary";
import { StyledList } from "./Timer/styled/StyledList";
import StyledApp from "./Timer/styled/StyledApp";
import TaskList from "./TaskList";

// spa main
// list provider
const MainPage = () => (
  <ErrorBoundary>
    <PomodoroProvider>
      <StyledApp>
        <StyledTimer>
          <h1>Pomodoro timer</h1>
          <Timer />
        </StyledTimer>
        <StyledList>
          <TaskList />
        </StyledList>
      </StyledApp>
    </PomodoroProvider>
  </ErrorBoundary>
);
export default MainPage;
