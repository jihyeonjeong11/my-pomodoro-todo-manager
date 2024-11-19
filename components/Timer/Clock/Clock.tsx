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
import useWorker from "@/components/common/hooks/useWorker";
import useCircleOffset from "../hooks/useCircleOffset";

type WorkerMessage = { data: { message: string; type: string } };

const TIME_WORKER = (): Worker =>
  new Worker(new URL("components/common/workers/timeWorker", import.meta.url));

const Clock = () => {
  const {
    tab: { get: getTab, set: setTab },
  } = usePomodoro(["isStarted", "tab"]);

  const {
    tasks: { get: getTasks, set: setTask },
    selectedTask: { get: getSelectedTask },
  } = useTasklist(["tasks", "selectedTask"]);

  const [leftSecs, setLeftSecs] = useState(getTab.countdown);

  const { isStarted, toggle } = useTimerControl(
    getTab.title,
    getTab.countdown,
    setTab,
    getSelectedTask.id,
    getTasks,
    setTask
  );

  const worker = useWorker(TIME_WORKER, (data) => {
    if (data.data === "done") {
      // active pomo + 1
      toggle();
      return;
    }
    setLeftSecs(data.data);
  });

  const { circleOffset } = useCircleOffset(
    getTab.title,
    getTab.countdown,
    getTab.decrementor,
    leftSecs
  );

  const tick = () => {
    setTab({
      ...getTab,
      countdown: getTab.countdown - DEFAULT_TICK_VALUE,
    });
    const totalChange = getTab.decrementor;
    setCircleOffset((prev) => prev + totalChange);
  };

  useEffect(() => {
    if (worker.current) {
      console.log("title changed");
      worker.current?.postMessage({
        action: "switch",
        countdown: getTab.countdown,
      });
    }
  }, [getTab.countdown, getTab.title, worker]);

  useEffect(() => {
    if (worker.current && isStarted === "started") {
      worker.current?.postMessage("started");
    }

    if (worker.current && isStarted === "stopped") {
      worker.current?.postMessage("stopped");
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
          <h2>{isStarted === "stopped" ? "Start" : "Pause"}</h2>
        </div>
      </button>
    </>
  );
};

export default Clock;
