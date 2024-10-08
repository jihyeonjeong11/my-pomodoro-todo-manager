import Head from "next/head";
import { useEffect, useState } from "react";
import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { convertMsToTime, findTab } from "@/components/Timer/functions";
import useInterval from "@/components/Timer/hooks/useInterval";
import useTimerControl from "@/components/Timer/hooks/useTimerControl";
import {
  DEFAULT_CIRCLE_OFFSET,
  DEFAULT_TICK_VALUE,
} from "@/components/Timer/constants";

const Clock = () => {
  const {
    tab: { get: getTab, set: setTab },
  } = usePomodoro(["isStarted", "tab"]);
  const [circleOffset, setCircleOffset] = useState(DEFAULT_CIRCLE_OFFSET);

  const tick = () => {
    setTab({
      ...getTab,
      countdown: getTab.countdown - DEFAULT_TICK_VALUE,
    });
    const totalChange = 10 * getTab.decrementor;
    setCircleOffset((prev) => prev - totalChange);
  };
  const { isStarted, toggle } = useTimerControl(getTab.title, getTab.countdown);
  useInterval(tick, isStarted === "started" ? DEFAULT_TICK_VALUE : null);

  useEffect(() => {
    setCircleOffset(DEFAULT_CIRCLE_OFFSET);
  }, [getTab.title]);

  const time = convertMsToTime(getTab.countdown);
  const isOriginalTime = findTab(getTab.title).countdown === getTab.countdown;

  return (
    <>
      <Head>
        <title>{time}</title>
        <meta
          name="description"
          content="Task Reminder using Pomodoro method"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="spacing">
        <button
          data-testid="timer-button"
          className="inner"
          type="button"
          aria-label="star-timer"
          onClick={toggle}
        >
          <div className="circle-container">
            <svg height="100%" width="100%">
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                strokeLinecap="round"
                strokeDasharray={`${DEFAULT_CIRCLE_OFFSET}%`}
                strokeDashoffset={
                  isStarted === "stopped" && isOriginalTime
                    ? `0%`
                    : `${circleOffset}%`
                }
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
