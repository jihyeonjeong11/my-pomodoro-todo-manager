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
