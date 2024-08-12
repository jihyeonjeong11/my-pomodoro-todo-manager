// spa main

import { ErrorBoundary } from "@/components/ErrorBoundary";
import TaskList from "@/components/TaskList";
import Timer from "@/components/Timer";
import StyledApp from "@/components/common/styled/StyledApp";
import { StyledList } from "@/components/TaskList/styled/StyledList";
import { StyledTimer } from "@/components/Timer/styled/StyledTimer";
import { PomodoroProvider } from "@/components/contexts/PomodoroContext";

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
