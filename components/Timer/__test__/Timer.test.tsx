/* eslint-env jest */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    expect(time.textContent).toEqual("01:00");
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
    // I can make it working by mocking timer, but will that be meaningful, since using fake timer is not actual timer! Maybe I can use E2E for that?
    expect(time.textContent).toBe("30:00");
    fireEvent.click(timerButton);
    await waitFor(() => {
      expect(time.textContent).toEqual("30:00");
    });

    fireEvent.click(timerButton);
    console.log(time.textContent);
    await waitFor(() => {
      expect(time.textContent).toEqual("30:00");
    });
  });
});
