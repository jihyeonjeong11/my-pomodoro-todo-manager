import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { findTab, toggleTimer } from "../functions";
import useClock from "../hooks/useClock";

const Clock = () => {
  const {
    title: { get },
    isStarted: { get: getIsStarted, set },
  } = usePomodoro(["title", "isStarted"]);
  const countdown = findTab(get);
  const { getTime } = useClock(countdown, getIsStarted);
  return (
    <section>
      <button
        data-testid="timer-button"
        className="inner"
        type="button"
        aria-label="star-timer"
        onClick={() => set(toggleTimer(getIsStarted))}
      >
        <div className="circle-container">
          <svg height="100%" width="100%">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              strokeLinecap="round"
              strokeDashoffset="0%"
            />
          </svg>
        </div>
        <div className="numbers-inner">
          <span data-testid="time" style={{ color: "white" }}>
            {getTime()}
          </span>
        </div>
      </button>
    </section>
  );
};

export default Clock;
