import Head from "next/head";
import { useEffect, useState } from "react";
import { convertMsToTime, findTab } from "@/components/Timer/functions";
import useInterval from "@/components/Timer/hooks/useInterval";
import useTimerControl from "@/components/Timer/hooks/useTimerControl";
import {
  DEFAULT_CIRCLE_OFFSET,
  DEFAULT_TICK_VALUE,
  TIMER_STATUS,
} from "@/components/Timer/constants";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { type TabWithMutableCountdown } from "@/types/Timer";
import { type TaskType } from "@/types/TaskList";

type Props = {
  getTab: TabWithMutableCountdown;
  setTab: (value: TabWithMutableCountdown) => void;
  selectedTask: TaskType | undefined;
  initialCountdown: number;
  setInitialCountdown: SetStateAction<number>;
};

const Clock: FC<Props> = ({
  getTab,
  setTab,
  selectedTask,
  initialCountdown,
  isStarted,
  toggle,
}) => {
  const {
    tasks: { get: getTasks, set: setTasks },
    selectedTaskId: { get: getSelectedTaskId, set: setSelectedTaskId },
  } = useTasklist(["tasks", "selectedTaskId"]);
  const [derivedCountdown, setDerivedCountdown] = useState(initialCountdown);
  const [circleOffset, setCircleOffset] = useState(DEFAULT_CIRCLE_OFFSET);

  const tick = () => {
    const totalChange = 10 * getTab.decrementor;
    setCircleOffset((prev) => prev - totalChange);
    setDerivedCountdown(derivedCountdown - DEFAULT_TICK_VALUE);
  };
  // modal did you finished?
  // yes, leftSecs = 0 || leftSecs 25 mins
  useInterval(tick, isStarted === "started" ? DEFAULT_TICK_VALUE : null);

  useEffect(() => {
    setCircleOffset(DEFAULT_CIRCLE_OFFSET);
  }, [getTab.title]);

  useEffect(() => {
    setDerivedCountdown(initialCountdown);
  }, [initialCountdown]);

  const time = convertMsToTime(derivedCountdown);
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
