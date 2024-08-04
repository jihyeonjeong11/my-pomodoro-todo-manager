// @ts-nocheck

import { renderHook, act } from "@testing-library/react";
import useTimerControl from "@/components/Timer/hooks/useTimerControl";
import { TIMER_STATUS } from "@/components/Timer/constants";

describe("useTimerControl", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with stopped status", () => {
    const { result } = renderHook(() => useTimerControl("pomodoro", 1000));
    expect(result.current.isStarted).toBe(TIMER_STATUS.stopped);
  });

  it("should toggle between started and stopped", () => {
    const { result } = renderHook(() => useTimerControl("pomodoro", 1000));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isStarted).toBe(TIMER_STATUS.started);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isStarted).toBe(TIMER_STATUS.stopped);
  });

  it("should reset to stopped when title changes", () => {
    const { result, rerender } = renderHook(
      ({ title }) => useTimerControl(title, 1000),
      { initialProps: { title: "pomodoro" } },
    );

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isStarted).toBe(TIMER_STATUS.started);

    rerender({ title: "break" });
    expect(result.current.isStarted).toBe(TIMER_STATUS.stopped);
  });
});
