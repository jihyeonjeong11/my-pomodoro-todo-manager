/* eslint-env jest */
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import themes from "@/styles/themes";
import { ThemeProvider } from "styled-components";
import { PomodoroProvider } from "@/components/contexts/PomodoroContext";
import Timer from "..";

describe("Loads properly", () => {
  it("Renders elements", () => {
    render(
      <ThemeProvider theme={themes.defaultTheme}>
        <PomodoroProvider>
          <Timer />
        </PomodoroProvider>
      </ThemeProvider>,
    );

    const tabs = screen.getByTestId("tab");
    const timerButton = screen.getByTestId("tab");
    expect(tabs).toBeTruthy();
    expect(timerButton).toBeTruthy();
  });

  it("Interacts properly", () => {
    render(
      <ThemeProvider theme={themes.defaultTheme}>
        <PomodoroProvider>
          <Timer />
        </PomodoroProvider>
      </ThemeProvider>,
    );
    const tabs = screen.getAllByRole("button");
    const time = screen.getByTestId("time");
    expect(time.textContent).toEqual("30:00");

    fireEvent.click(tabs[1]);
    expect(time.textContent).toEqual("05:00");
  });

  it("Starts timer properly", async () => {
    render(
      <ThemeProvider theme={themes.defaultTheme}>
        <PomodoroProvider>
          <Timer />
        </PomodoroProvider>
      </ThemeProvider>,
    );
    const timerButton = screen.getByTestId("tab");
    const time = screen.getByTestId("time");

    expect(time.textContent).toBe("30:00");
    fireEvent.click(timerButton);
    setTimeout(() => {
      expect(time.textContent).toEqual("29:58");
    }, 2000);
  });
});
