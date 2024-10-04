import Head from "next/head";
import { useEffect, useState } from "react";
import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { convertMsToTime, findTab } from "@/components/Timer/functions";
import useInterval from "@/components/Timer/hooks/useInterval";
import useTimerControl from "@/components/Timer/hooks/useTimerControl";
import {
  DEFAULT_CIRCLE_OFFSET,
  DEFAULT_TICK_VALUE,
  TIMER_STATUS,
} from "@/components/Timer/constants";
import { useTasklist } from "@/components/contexts/TasklistContext";

const Clock = () => {
  const {
    tab: { get: getTab },
  } = usePomodoro(["isStarted", "tab"]);

  const {
    tasks: { get: getTasks, set: setTask },
    selectedTaskId: { get: getSelectedTaskId, set: setSelectedTaskId },
  } = useTasklist(["tasks", "selectedTaskId"]);

  const [initialCountdown, setInitialCountdown] = useState(1_500_000);
  const [circleOffset, setCircleOffset] = useState(DEFAULT_CIRCLE_OFFSET);
  const { isStarted, toggle } = useTimerControl(getTab.title, getTab.countdown);
  const selectedTask = getTasks.find((t) => t.id === getSelectedTaskId);

  useEffect(() => {
    if (getTab.title !== "pomodoro" || selectedTask === undefined) {
      setInitialCountdown(getTab.countdown);
    } else {
      setInitialCountdown(selectedTask.leftSecs);
    }
  }, [getTab.title, getTab.countdown]);

  useEffect(() => {
    if (selectedTask !== undefined) {
      setInitialCountdown(selectedTask.leftSecs);
    }
  }, [setSelectedTaskId]);

  useEffect(() => {
    // when changed tahb this changes.
    if (isStarted === TIMER_STATUS.stopped && getTab.title === "pomodoro") {
      setTask(
        getTasks.map((t) => {
          if (t.id === getSelectedTaskId) {
            return {
              ...t,
              leftSecs: initialCountdown,
            };
          }
          return t;
        })
      );
    }
  }, [isStarted]);

  const tick = () => {
    const totalChange = 10 * getTab.decrementor;
    setCircleOffset((prev) => prev - totalChange);
    setInitialCountdown(initialCountdown - DEFAULT_TICK_VALUE);
  };
  // modal did you finished?
  // yes, leftSecs = 0 || leftSecs 25 mins
  useInterval(tick, isStarted === "started" ? DEFAULT_TICK_VALUE : null);

  useEffect(() => {
    setCircleOffset(DEFAULT_CIRCLE_OFFSET);
  }, [getTab.title]);

  const time = convertMsToTime(initialCountdown);
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
