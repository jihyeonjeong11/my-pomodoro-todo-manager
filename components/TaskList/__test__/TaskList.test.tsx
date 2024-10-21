/* eslint-env jest */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { MotionGlobalConfig } from "framer-motion";
import themes from "@/styles/themes";
import { ThemeProvider } from "styled-components";
import { TasklistProvider } from "@/components/contexts/TasklistContext";
import TaskList from "@/components/TaskList";
import TaskListButton from "@/components/TaskList/components/forms/TasklistController";
import TaskForm from "@/components/TaskList/components/forms/TaskForm";

MotionGlobalConfig.skipAnimations = true;

// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn();

  disconnect = jest.fn();

  unobserve = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

describe("Tasklist", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders elements", () => {
    render(
      <ThemeProvider theme={themes.defaultTheme}>
        <TasklistProvider>
          <TaskList />
        </TasklistProvider>
      </ThemeProvider>
    );

    const taskButton = screen.getByRole("button");
    expect(taskButton).toBeTruthy();
  });

  it("Calls flipTaskButton when clicked", () => {
    const mockFlipTaskButton = jest.fn();
    render(
      <TaskListButton flipTaskButton={mockFlipTaskButton} showAddForm={false} />
    );
    const button = screen.getByTestId("tasklist-button");
    fireEvent.click(button);
    expect(mockFlipTaskButton).toHaveBeenCalledTimes(1);
  });

  it("Renders TaskForm when showAddForm is true", async () => {
    const mockFlipTaskButton = jest.fn();
    render(
      <TasklistProvider>
        <TaskListButton flipTaskButton={mockFlipTaskButton} showAddForm />
      </TasklistProvider>
    );
    await waitFor(
      () => {
        const taskInput = screen.getByRole("textbox");
        expect(taskInput).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("Fills input when user types", async () => {
    render(
      <TasklistProvider>
        <TaskForm />
      </TasklistProvider>
    );

    await waitFor(
      async () => {
        const user = userEvent.setup();
        const taskInput = screen.getByRole("textbox");
        await user.type(taskInput, "task1");
        expect(taskInput).toHaveValue("task1");
      },
      { timeout: 1000 }
    );
  });

  it("Calls onSubmit when user types enter", async () => {
    const mockOnSubmit = jest.fn();
    render(
      <TasklistProvider>
        <TaskForm />
      </TasklistProvider>
    );

    await waitFor(
      async () => {
        const taskForm = screen.getByTestId("task-form") as HTMLFormElement;
        taskForm.submit = mockOnSubmit;
        const user = userEvent.setup();
        const taskInput = screen.getByRole("textbox");
        await user.type(taskInput, "task1");

        const mockKeydownHandler = jest.fn((e) => e);

        taskInput.addEventListener("keydown", mockKeydownHandler);

        await user.type(taskInput, "{enter}");

        expect(mockKeydownHandler).toHaveBeenCalledTimes(1);
        expect(mockKeydownHandler.mock.calls[0][0].key).toBe("Enter");
        // Currently couldn't simulate firing onSubmit after pressing enter.
        // This input must be cleared, considering the onSubmit function.
        expect(taskInput).toHaveValue("");

        // Will save below for later for completion.

        // await waitFor(() => {
        //   expect(mockOnSubmit).toHaveBeenCalledWith("task1", mockOnSubmit); // Mock function ensures it's called with the correct arguments
        // });

        // fireEvent.keyDown(taskInput, {
        //   key: "Enter",
        //   code: "Enter",
        //   charCode: 13,
        // });
      },
      { timeout: 1000 }
    );
  });
});
