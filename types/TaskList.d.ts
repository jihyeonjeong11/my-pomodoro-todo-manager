export type TaskListType = {
  title: string;
  countdown: number;
};

export type TaskType = {
  title: string;
  id: number; // Server mock later
  approxPomodoro: number; // Advanced feature.
  isActive?: boolean;
  leftSecs?: number; // Will determine its end or not.
};
