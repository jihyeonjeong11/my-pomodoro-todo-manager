import { type TaskType } from "@/types/TaskList";

// use Zod
export const setInitialTask = (tasks: TaskType[], text: string) => ({
  // approxPomodoro: 1,
  // isActive: true,
  // leftSecs: TABS[0].countdown,
  title: text,
  id: tasks.length,
  createdAt: new Date(),
  updatedAt: new Date(),
  pomodoroCount: 0,
  isCompleted: false,
});

export const toggleCompleteTask = (tasks: TaskType[], id: number) => {
  const found = tasks.find((t) => t.id === id);
  if (found === undefined) {
    throw new Error("task not found");
  } else {
    return {
      ...found,
      isActive: false,
      isCompleted: !found.isCompleted,
    };
  }
};

export const setCompleteTask = (tasks: TaskType[], id: number) =>
  ({
    ...tasks.find((t) => t.id === id),
    isActive: false,
    leftSecs: 0,
  }) as TaskType;

export const setOthersInactive = (tasks: TaskType[]) =>
  tasks.map((t) => ({
    ...t,
    isActive: false,
  }));

export const filterTask = (tasks: TaskType[], id: number) =>
  tasks.filter((t) => t.id !== id);
