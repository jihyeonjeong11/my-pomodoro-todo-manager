import Head from "next/head";
import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { toggleTimer } from "../functions";
import useClock from "../hooks/useClock";

const Clock = () => {
  const {
    isStarted: { get: getIsStarted, set: setIsStarted },
    tab: { get: getTab, set: setTab },
  } = usePomodoro(["isStarted", "tab"]);
  const tick = () => {
    setTab({ ...getTab, countdown: (getTab.countdown as number) - 1000 });
  };

  const { circleOffset, getTime } = useClock(tick);
  const time = getTime();

  return (
    <>
      <Head>
        <title>{time}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <button
          data-testid="timer-button"
          className="inner"
          type="button"
          aria-label="star-timer"
          onClick={() => setIsStarted(toggleTimer(getIsStarted))}
        >
          <div className="circle-container">
            <svg height="100%" width="100%">
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                strokeLinecap="round"
                strokeDashoffset={`${circleOffset}%`}
              />
            </svg>
          </div>
          <div className="numbers-inner">
            <span data-testid="time" style={{ color: "white" }}>
              {time}
            </span>
          </div>
        </button>
      </section>
    </>
  );
};

export default Clock;
