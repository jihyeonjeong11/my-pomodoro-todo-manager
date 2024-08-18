// spa main

import { ErrorBoundary } from "@/components/ErrorBoundary";
import TaskListButton from "@/components/TaskList/components/TaskListButton";
import Timer from "@/components/Timer";
import StyledApp from "@/components/common/styled/StyledApp";
import { StyledList } from "@/components/TaskList/styled/StyledList";
import { StyledTimer } from "@/components/Timer/styled/StyledTimer";
import { PomodoroProvider } from "@/components/contexts/PomodoroContext";
import { TaskWindowsProvider } from "@/components/contexts/TaskwindowContext";
import dynamic from "next/dynamic";

const WindowLoader = dynamic(
  () => import("@/components/common/components/WindowLoader")
);

// list provider
const MainPage = () => (
  <ErrorBoundary>
    <PomodoroProvider>
      <TaskWindowsProvider>
        <StyledApp>
          <StyledTimer>
            <h1 className="spacing">Pomodoro timer</h1>
            <Timer />
          </StyledTimer>
          <StyledList>
            <TaskListButton />
          </StyledList>
        </StyledApp>

        <WindowLoader />
      </TaskWindowsProvider>
    </PomodoroProvider>
  </ErrorBoundary>
);
export default MainPage;
