// spa main

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { IndexedDBProvider } from "@/components/contexts/IndexedDBContext";
import { TaskWindowsProvider } from "@/components/contexts/TaskwindowContext";
import { PomodoroProvider } from "@/components/contexts/PomodoroContext";
import { TasklistProvider } from "@/components/contexts/TasklistContext";
import StyledApp from "@/components/common/styled/StyledApp";
import AppContainer from "@/components/common/components/AppContainer";

// list provider
const MainPage = () => (
  <ErrorBoundary>
    <IndexedDBProvider>
      <TaskWindowsProvider>
        <PomodoroProvider>
          <TasklistProvider>
            <StyledApp>
              <AppContainer />
            </StyledApp>
          </TasklistProvider>
        </PomodoroProvider>
      </TaskWindowsProvider>
    </IndexedDBProvider>
  </ErrorBoundary>
);
export default MainPage;
