/* eslint-env jest */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import themes from "@/styles/themes";
import { ThemeProvider } from "styled-components";
import { PomodoroProvider } from "@/components/contexts/PomodoroContext";
import Timer from "..";

describe("Loads properly", () => {
  it("Renders elements", async () => {
    render(
      <ThemeProvider theme={themes.defaultTheme}>
        <PomodoroProvider>
          <Timer />
        </PomodoroProvider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      const tabs = screen.getByTestId("tab");
      const timerButton = screen.getByTestId("tab");
      expect(tabs).toBeTruthy();
      expect(timerButton).toBeTruthy();
    });
  });

  it("Interacts properly", async () => {
    render(
      <ThemeProvider theme={themes.defaultTheme}>
        <PomodoroProvider>
          <Timer />
        </PomodoroProvider>
      </ThemeProvider>,
    );
    await waitFor(() => {
      const tabs = screen.getAllByRole("button");
      const time = screen.getByTestId("time");
      expect(time.textContent).toEqual("30:00");

      fireEvent.click(tabs[1]);
      expect(time.textContent).toEqual("01:00");
    });
  });
  // timer fails. see useTimerControl.test.tsx
});
