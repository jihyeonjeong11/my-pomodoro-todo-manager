// @ts-nocheck
import { type TaskType } from "@/types/TaskList";
import useTaskControl from "@/components/TaskList/components/hooks/useTaskControl";
import { renderHook, act } from "@testing-library/react";

const mockTasks: TaskType[] = [
  {
    id: "1",
    title: "Task 1",
    isActive: true,
    isCompleted: false,
    leftSecs: 1500,
  },
  {
    id: "2",
    title: "Task 2",
    isActive: false,
    isCompleted: false,
    leftSecs: 1500,
  },
  {
    id: "3",
    title: "Task 3",
    isActive: false,
    isCompleted: false,
    leftSecs: 1500,
  },
];

describe("useTaskControl", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should post a task and set the first task active", () => {
    const { result } = renderHook(() => useTaskControl(mockTasks));
    const callback = jest.fn();
    act(() => {
      result.current.postTask("New Task", callback);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    const updatedTasks = callback.mock.calls[0][0];

    expect(updatedTasks[0].title).toBe("New Task");
    expect(updatedTasks[0].isActive).toBe(true);
  });

  it("should remove a task and make the first task active", () => {
    const { result } = renderHook(() => useTaskControl(mockTasks));
    const callback = jest.fn();
    act(() => {
      result.current.deleteTask(mockTasks[0].id, callback);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    const updatedTasks = callback.mock.calls[0][0];

    expect(updatedTasks[0].title).toBe("Task 2");
    expect(updatedTasks[0].isActive).toBe(true);
  });

  it("should complete a task and make the completed task to last order", () => {
    const { result } = renderHook(() => useTaskControl(mockTasks));
    const callback = jest.fn();
    act(() => {
      result.current.completeTask(mockTasks[1].id, callback);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    const updatedTasks = callback.mock.calls[0][0];

    expect(updatedTasks.at(-1).title).toBe("Task 2");
    expect(updatedTasks[0].isActive).toBe(true);
  });

  it("should set completed task activated again", () => {
    const { result, rerender } = renderHook(
      ({ tasks }) => useTaskControl(tasks),
      {
        initialProps: { tasks: mockTasks },
      }
    );

    const callback = jest.fn();

    // Complete the task
    act(() => {
      result.current.completeTask(mockTasks[1].id, callback);
    });

    const updatedTasksAfterCompletion = callback.mock.calls[0][0];

    rerender({ tasks: updatedTasksAfterCompletion });

    act(() => {
      result.current.activateOrReactivateTask(
        mockTasks[1].id,
        updatedTasksAfterCompletion[1].leftSecs === 0,
        callback
      );
    });

    expect(callback).toHaveBeenCalledTimes(2);

    const updatedTasksAfterActivation = callback.mock.calls[1][0];
    expect(updatedTasksAfterActivation.at(-1).title).toBe("Task 2");
    expect(updatedTasksAfterActivation.at(-1).isActive).toBe(true);
    expect(updatedTasksAfterActivation[0].isActive).toBe(false);
  });

  it("should activate task and set others inactive", () => {
    const { result } = renderHook(() => useTaskControl(mockTasks));
    const callback = jest.fn();
    act(() => {
      result.current.activateOrReactivateTask(
        mockTasks[2].id,
        mockTasks[2].leftSecs === 0,
        callback
      );
    });
    expect(callback).toHaveBeenCalledTimes(1);
    const updatedTasks = callback.mock.calls[0][0];

    expect(updatedTasks.at(-1).isActive).toBe(true);
    expect(updatedTasks[0].isActive).toBe(false);
  });
});
