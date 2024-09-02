// spa main

import { ErrorBoundary } from "@/components/ErrorBoundary";
import Timer from "@/components/Timer";
import StyledApp from "@/components/common/styled/StyledApp";
import { StyledList } from "@/components/TaskList/styled/StyledList";
import { StyledTimer } from "@/components/Timer/styled/StyledTimer";
import { PomodoroProvider } from "@/components/contexts/PomodoroContext";
import dynamic from "next/dynamic";
import TaskList from "@/components/TaskList";
import { TasklistProvider } from "@/components/contexts/TasklistContext";

const WindowLoader = dynamic(
  () => import("@/components/common/components/WindowLoader")
);

// list provider
const MainPage = () => (
  <ErrorBoundary>
    <PomodoroProvider>
      <TasklistProvider>
        <StyledApp>
          <StyledTimer>
            <h1 className="spacing">Pomodoro timer</h1>
            <Timer />
          </StyledTimer>
          <StyledList>
            <TaskList />
          </StyledList>
        </StyledApp>
        {/* Maybe will be deleted. */}
        {/* <WindowLoader /> */}
      </TasklistProvider>
    </PomodoroProvider>
  </ErrorBoundary>
);
export default MainPage;
