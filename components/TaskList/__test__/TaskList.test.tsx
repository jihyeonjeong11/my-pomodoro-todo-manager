/* eslint-env jest */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import "@testing-library/jest-dom";
import themes from "@/styles/themes";
import { ThemeProvider } from "styled-components";
import { TasklistProvider } from "@/components/contexts/TasklistContext";
import TaskList from "@/components/TaskList";
import TaskListButton from "@/components/TaskList/components/forms/TaskListButton";

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

describe("Loads properly", () => {
  it("Renders elements", async () => {
    render(
      <ThemeProvider theme={themes.defaultTheme}>
        <TasklistProvider>
          <TaskList />
        </TasklistProvider>
      </ThemeProvider>,
    );
    await waitFor(() => {
      const taskButton = screen.getByRole("button");
      expect(taskButton).toBeTruthy();
    });
  });
  it("Call flipTaskButton when clicked", async () => {
    const mockFlipTaskButton = jest.fn();

    render(
      <TaskListButton
        flipTaskButton={mockFlipTaskButton}
        showAddForm={false}
      />,
    );
    const button = screen.getByTestId("tasklist-button");
    fireEvent.click(button);
    expect(mockFlipTaskButton).toHaveBeenCalledTimes(1);
  });
});
