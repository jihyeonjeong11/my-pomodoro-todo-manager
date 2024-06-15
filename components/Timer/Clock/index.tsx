import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { findTab } from "../functions";

const Clock = () => {
  const {
    title: { get },
  } = usePomodoro(["title"]);
  const countdown = findTab(get);
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
          <span style={{ color: "white" }}>{countdown}</span>
        </div>
      </div>
    </section>
  );
};

export default Clock;
