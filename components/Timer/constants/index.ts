export const TABS = [
  {
    title: "pomodoro",
    countdown: 1_500_000, // 25 mins // 1_500_000
    decrementor: 0.2,
  },
  {
    title: "short break",
    countdown: 60_000, // 1 min
    decrementor: 5,
  },
  {
    title: "long break",
    countdown: 300_000, // 5 mins
    decrementor: 1,
  },
] as const;

export const TIMER_STATUS = {
  stopped: "stopped",
  started: "started",
  done: "done",
} as const;

export const DEFAULT_TICK_VALUE = 1000;
export const DEFAULT_CIRCLE_OFFSET = 0;
export const DEFAULT_TASKFORM_HEIGHT = 110;
export const TASKFORM_PADDING = 50;
