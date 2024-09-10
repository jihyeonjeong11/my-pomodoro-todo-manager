/* eslint-env jest */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import "@testing-library/jest-dom";
import themes from "@/styles/themes";
import { ThemeProvider } from "styled-components";
import { TasklistProvider } from "@/components/contexts/TasklistContext";
import TaskList from "@/components/TaskList";

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
      </ThemeProvider>
    );
    await waitFor(() => {
      const taskButton = screen.getByTestId("tasklist-button");
      expect(taskButton).toBeTruthy();
    });
  });
  it("CRUD properly", async () => {
    render(
      <ThemeProvider theme={themes.defaultTheme}>
        <TasklistProvider>
          <TaskList />
        </TasklistProvider>
      </ThemeProvider>
    );
    const taskButton = screen.getByTestId("tasklist-button");
    fireEvent.click(taskButton);
    const taskForm = await waitFor(() => screen.getByTestId("tasklist-form"));

    // await waitFor(async () => {
    //   console.log("hi");
    //   const taskButton = screen.getByTestId("tasklist-button");
    //   console.log(taskButton);
    //   fireEvent.click(taskButton);
    //   // Wait for the form to appear
    //   const taskForm = await waitFor(() => screen.getByTestId("tasklist-form"));
    //   expect(taskForm).toBeTruthy();
    //   // waitFor(
    //   //   () => {
    //   //     const taskForm = screen.getByTestId("tasklist-form");
    //   //     expect(taskForm).toBeFalsy();
    //   //     const taskInput = screen.getByTestId("tasklist-input");
    //   //     fireEvent.change(taskInput, { target: { value: "task" } });
    //   //     fireEvent.keyDown(taskInput, {
    //   //       key: "Enter",
    //   //       code: "Enter",
    //   //       charCode: 13,
    //   //     });
    //   //     const taskItem = screen.getByTestId("task-0");
    //   //     expect(taskItem).toBeTruthy();

    //   //     const removeButton = screen.getByTestId("task-0-remove");
    //   //     console.log(removeButton);
    //   //     fireEvent.click(removeButton);
    //   //     waitFor(
    //   //       () => {
    //   //         expect(taskItem).toBeTruthy();
    //   //       },
    //   //       { timeout: 1000 }
    //   //     );
    //   //   },
    //   //   { timeout: 1000 }
    //   // );
    // });
  });
});
