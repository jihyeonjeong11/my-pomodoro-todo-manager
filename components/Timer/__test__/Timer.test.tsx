/* eslint-env jest */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import themes from "@/styles/themes";
import { ThemeProvider } from "styled-components";
import Timer from "..";

test("loads properly", () => {
  render(
    <ThemeProvider theme={themes.defaultTheme}>
      <Timer selectedTab="pomodoro" setSelectedTab={() => null} />
    </ThemeProvider>
  );

  expect(screen.getByText("pomodoro"));
});
