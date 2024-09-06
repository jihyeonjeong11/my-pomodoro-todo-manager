export type TaskListType = {
  title: string;
  countdown: number;
};

export type TaskType = {
  title: string;
  id: number; // Server mock later
  leftSecs: number; // Will determine its end or not.
  approxPomodoro: number; // Advanced feature.
};
