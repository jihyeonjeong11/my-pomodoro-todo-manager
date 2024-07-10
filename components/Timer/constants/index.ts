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

export const TAB_CENTER_X = 0;
export const TAB_LEFT_X = -105;
export const TAB_RIGHT_X = 105;

export const TIMER_ENDS = 0;
