import Timer from '@/components/Timer';
import { StyledTimer } from './Timer/styled/StyledTimer';
import { PomodoroProvider } from './contexts/PomodoroContext';
import { ErrorBoundary } from './ErrorBoundary';

// spa main
const MainPage = () => (
  <ErrorBoundary>
    <PomodoroProvider>
      <StyledTimer>
        <h1>Pomodoro timer</h1>
        <Timer />
      </StyledTimer>
    </PomodoroProvider>
  </ErrorBoundary>
);
export default MainPage;
