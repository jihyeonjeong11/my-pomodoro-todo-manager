// spa main

import { ErrorBoundary } from '@/components/ErrorBoundary';
import TaskList from '@/components/TaskList';
import Timer from '@/components/Timer';
import StyledApp from '@/components/common/styled/StyledApp';
import { StyledList } from '@/components/TaskList/styled/StyledList';
import { StyledTimer } from '@/components/Timer/styled/StyledTimer';
import { PomodoroProvider } from '@/components/contexts/PomodoroContext';
import { TaskWindowsProvider } from '@/components/contexts/TaskwindowContext';

// list provider
const MainPage = () => (
  <ErrorBoundary>
    <PomodoroProvider>
      <TaskWindowsProvider>
        <StyledApp>
          <h1>Pomodoro timer</h1>
          <StyledList>
            <TaskList />
          </StyledList>
          <StyledTimer>
            <Timer />
          </StyledTimer>
        </StyledApp>
      </TaskWindowsProvider>
    </PomodoroProvider>
  </ErrorBoundary>
);
export default MainPage;
