export type TaskListType = {
  title: string;
  countdown: number;
};

export type TaskType = {
  title: string;
  id: number; // Server mock later
  createdAt: string; // Server mock later
  isActive: boolean;
  approxPomodoro: number; // Advanced feature.
  leftSecs: number; // Will determine its end or not.
};
