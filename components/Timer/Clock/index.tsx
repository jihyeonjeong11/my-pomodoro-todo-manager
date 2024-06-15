import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { findTab } from "../functions";
import useClock from "../hooks/useClock";

const Clock = () => {
  const {
    title: { get },
  } = usePomodoro(["title"]);
  const countdown = findTab(get);
  const { getTime } = useClock(countdown);
  return (
    <section>
      <div className="inner">
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
          <span style={{ color: "white" }}>{getTime()}</span>
        </div>
      </div>
    </section>
  );
};

export default Clock;
