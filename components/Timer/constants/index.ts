export const TABS = [
  {
    title: "pomodoro",
    countdown: 1_800_000, // 30 mins
  },
  {
    title: "short break",
    countdown: 300_000, // 5 mins
  },
  {
    title: "long break",
    countdown: 600_000, // 10 mins
  },
] as const;

export const TIMER_STATUS = {
  stopped: "stopped",
  started: "started",
} as const;

export const TAB_CENTER_X = 0;
export const TAB_LEFT_X = -105;
export const TAB_RIGHT_X = 105;
