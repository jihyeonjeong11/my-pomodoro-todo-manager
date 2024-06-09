import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { TABS } from "../constants";

const Clock = () => {
  const {
    title: { get },
  } = usePomodoro(["title"]);
  const c = TABS.find((i) => i.title === get);
  return (
    <section>
      <div className="inner">
        <div className="svg-inner">
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
      </div>
      <div className="numbers-inner">
        <span style={{ color: "white" }}>{c!.countdown}</span>
      </div>
    </section>
  );
};

export default Clock;
