// spa main

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StyledList } from "@/components/TaskList/styled/StyledList";
import { StyledTimer } from "@/components/Timer/styled/StyledTimer";
import { IndexedDBProvider } from "@/components/contexts/IndexedDBContext";
import { PomodoroProvider } from "@/components/contexts/PomodoroContext";
import { TasklistProvider } from "@/components/contexts/TasklistContext";
import TaskList from "@/components/TaskList";
import Timer from "@/components/Timer";
import StyledApp from "@/components/common/styled/StyledApp";

// list provider
const MainPage = () => (
  <ErrorBoundary>
    <IndexedDBProvider>
      <PomodoroProvider>
        <TasklistProvider>
          <StyledApp>
            {/* need another wrapper handling loading and refresh the data.  reuse window */}
            <div className="wrapper">
              <StyledTimer>
                <h1 className="spacing">Pomodoro timer</h1>
                <Timer />
              </StyledTimer>
              <StyledList>
                <TaskList />
              </StyledList>
            </div>
          </StyledApp>
          {/* Maybe will be deleted. */}
          {/* <WindowLoader /> */}
        </TasklistProvider>
      </PomodoroProvider>
    </IndexedDBProvider>
  </ErrorBoundary>
);
export default MainPage;
