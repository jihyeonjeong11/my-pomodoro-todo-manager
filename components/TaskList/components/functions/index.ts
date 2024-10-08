import { TABS } from "@/components/Timer/constants";
import { type TaskType } from "@/types/TaskList";

// use Zod
export const setInitialTask = (tasks: TaskType[], text: string) => ({
  title: text,
  approxPomodoro: 1,
  id: tasks.length,
  createdAt: new Date(),
  updatedAt: new Date(),
  leftSecs: TABS[0].countdown,
  isActive: true,
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

const getActivatedTask = (tasks: TaskType[]) => tasks.find((t) => t.isActive);

export const makeFirstTaskActive = (tasks: TaskType[]) =>
  tasks.map((task, index) => ({
    ...task,
    isActive: index === 0,
  }));

export const makeFirstTaskActiveIfCurrentActivatedChanged = (
  tasks: TaskType[]
) => {
  if (!getActivatedTask(tasks)) {
    return makeFirstTaskActive(tasks);
  }
  return tasks;
};
