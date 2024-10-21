// spa main

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { IndexedDBProvider } from "@/components/contexts/IndexedDBContext";
import { TaskWindowsProvider } from "@/components/contexts/TaskwindowContext";
import { PomodoroProvider } from "@/components/contexts/PomodoroContext";
import { TasklistProvider } from "@/components/contexts/TasklistContext";
import TaskList from "@/components/TaskList";
import Timer from "@/components/Timer";
import AppContainer from "@/components/common/components/AppContainer";
import WindowLoader from "@/components/common/components/WindowLoader";
import StyledApp from "@/components/common/styled/StyledApp";

// list provider
const MainPage = () => (
  <ErrorBoundary>
    <IndexedDBProvider>
      <TaskWindowsProvider>
        <PomodoroProvider>
          <TasklistProvider>
            <StyledApp>
              <AppContainer>
                <h1>Pomodoro</h1>
                <Timer />
                <TaskList />
                <WindowLoader />
              </AppContainer>
            </StyledApp>
          </TasklistProvider>
        </PomodoroProvider>
      </TaskWindowsProvider>
    </IndexedDBProvider>
  </ErrorBoundary>
);
export default MainPage;
