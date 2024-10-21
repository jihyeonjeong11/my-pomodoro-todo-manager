export type TaskListType = {
  title: string;
  countdown: number;
};

export type TaskType = {
  title: string;
  id: number; // Server mock later
  createdAt: Date; // Postgres mock
  updatedAt: Date; // Postgres mock
  isActive: boolean;
  pomodoroCount: number;
  isCompleted: boolean;

  approxPomodoro: number; // For later

  leftSecs: number; // Will determine its end or not. // not used
};
