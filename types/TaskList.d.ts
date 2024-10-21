export type TaskListType = {
  title: string;
  countdown: number;
};

export type TaskType = {
  title: string;
  id: number; // Server mock later
  createdAt: Date; // postgres mock
  updatedAt: Date; // postgres mock
  isActive: boolean;
  approxPomodoro: number; // Advanced feature.
  leftSecs: number; // Will determine its end or not.
  pomodoroCount: number;
  isCompleted: boolean;
};
