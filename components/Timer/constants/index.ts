export const TABS = [
  {
    title: "pomodoro",
    countdown: 1_800_000, // 30 mins
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
