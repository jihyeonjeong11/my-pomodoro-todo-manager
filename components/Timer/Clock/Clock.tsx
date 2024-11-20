import Head from "next/head";
import { usePomodoro } from "@/components/contexts/PomodoroContext";
import { useTasklist } from "@/components/contexts/TasklistContext";
import { useCallback, useEffect, useState } from "react";
import useTimerControl from "@/components/Timer/hooks/useTimerControl";
import { convertMsToTime } from "@/components/Timer/functions";
import useWorker from "@/components/common/hooks/useWorker";
import useCircleOffset from "@/components/Timer/hooks/useCircleOffset";
import { TIMER_STATUS } from "@/components/Timer/constants";

const Clock = () => {
  const timeWorkerInit = useCallback(
    () =>
      new Worker(
        new URL("components/common/workers/timeWorker", import.meta.url),
      ),
    [],
  );

  const {
    tab: { get: getTab, set: setTab },
  } = usePomodoro(["isStarted", "tab"]);

  const {
    tasks: { get: getTasks, set: setTask },
    selectedTask: { get: getSelectedTask },
  } = useTasklist(["tasks", "selectedTask"]);

  const [leftSecs, setLeftSecs] = useState(getTab.countdown);

  const { isStarted, toggle, setIsStarted } = useTimerControl(
    getTab.title,
    getTab.countdown,
    setTab,
    getSelectedTask,
    getTasks,
    setTask,
  );

  const { circleOffset, completeOffset } = useCircleOffset(
    getTab.title,
    getTab.countdown,
    getTab.decrementor,
    leftSecs,
  );

  const onMessage = useCallback((data: any) => {
    if (typeof data.data === "number") {
      setLeftSecs(data.data);
    }
    if (data.data === TIMER_STATUS.done) {
      completeOffset();
      setIsStarted(TIMER_STATUS.done);
      // 11/19 need useEffect to handle selectedTask pomodoro counter
      data.target.postMessage({
        action: "switch",
        countdown: getTab.countdown,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const worker = useWorker(timeWorkerInit, onMessage);

  useEffect(() => {
    if (worker.current) {
      worker.current?.postMessage({
        action: "switch",
        countdown: getTab.countdown,
      });
    }
  }, [getTab.countdown, getTab.title, worker]);

  useEffect(() => {
    if (worker.current && isStarted === TIMER_STATUS.started) {
      worker.current?.postMessage(TIMER_STATUS.started);
    }

    if (worker.current && isStarted === TIMER_STATUS.stopped) {
      worker.current?.postMessage(TIMER_STATUS.stopped);
    }
  }, [isStarted, worker]);

  const time = convertMsToTime(leftSecs);

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
          <h2>{isStarted === TIMER_STATUS.started ? "Pause" : "Start"}</h2>
        </div>
      </button>
    </>
  );
};

export default Clock;
