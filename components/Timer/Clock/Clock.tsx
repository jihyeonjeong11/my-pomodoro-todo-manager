import Head from "next/head";
import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { useEffect, useState } from "react";
import {
  DEFAULT_CIRCLE_OFFSET,
  DEFAULT_TICK_VALUE,
} from "@/components/Timer/constants";
import useTimerControl from "@/components/Timer/hooks/useTimerControl";
import { convertMsToTime } from "@/components/Timer/functions";
import useInterval from "@/components/Timer/hooks/useInterval";

const Clock = () => {
  const {
    tab: { get: getTab, set: setTab },
  } = usePomodoro(["isStarted", "tab"]);

  const {
    tasks: { get: getTasks, set: setTask },
    selectedTask: { get: getSelectedTask },
  } = useTasklist(["tasks", "selectedTask"]);

  const [circleOffset, setCircleOffset] = useState(DEFAULT_CIRCLE_OFFSET);

  const tick = () => {
    setTab({
      ...getTab,
      countdown: getTab.countdown - DEFAULT_TICK_VALUE,
    });
    const totalChange = getTab.decrementor;
    setCircleOffset((prev) => prev + totalChange);
  };
  const { isStarted, toggle } = useTimerControl(
    getTab.title,
    getTab.countdown,
    setTab,
    getSelectedTask.id,
    getTasks,
    setTask,
  );
  useInterval(tick, isStarted === "started" ? DEFAULT_TICK_VALUE : null);

  useEffect(() => {
    setCircleOffset(DEFAULT_CIRCLE_OFFSET);
  }, [getTab.title]);

  useEffect(() => {
    if (getTab.countdown === 0) {
      setCircleOffset(DEFAULT_CIRCLE_OFFSET);
    }
  }, [getTab.countdown]);

  const time = convertMsToTime(getTab.countdown);
  // const isOriginalTime = findTab(getTab.title).countdown === getTab.countdown; not needed?
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
      <button onClick={toggle} className="clock-button" type="button">
        <svg id="time-progress" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            strokeDasharray="300"
            strokeLinecap="round"
            strokeWidth="3"
            strokeDashoffset={circleOffset}
          />
        </svg>
        <div className="remaining-time">
          <h1>{time}</h1>
          <h2>{isStarted === "stopped" ? "Start" : "Pause"}</h2>
        </div>
      </button>
    </>
  );
};

export default Clock;
