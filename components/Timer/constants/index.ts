export const TABS = [
  {
    title: "pomodoro",
    countdown: 1_500_000, // 25 mins
    decrementor: 0.016_67,
  },
  {
    title: "short break",
    countdown: 60_000, // 1 min
    decrementor: 0.5,
  },
  {
    title: "long break",
    countdown: 300_000, // 5 mins
    decrementor: 0.1,
  },
] as const;

export const TIMER_STATUS = {
  stopped: "stopped",
  started: "started",
} as const;

export const DEFAULT_TICK_VALUE = 1000;
export const DEFAULT_CIRCLE_OFFSET = 300;
export const DEFAULT_TASKFORM_HEIGHT = 110;
export const TASKFORM_PADDING = 50;
