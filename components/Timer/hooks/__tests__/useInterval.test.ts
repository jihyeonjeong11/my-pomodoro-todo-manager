import { renderHook } from "@testing-library/react";
import { useInterval } from "../useInterval";

jest.useFakeTimers();

describe("useInterval", () => {
  it("should call the callback function at the specified interval", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    // Fast-forward time
    jest.advanceTimersByTime(5000);

    // The callback should have been called 5 times
    expect(callback).toHaveBeenCalledTimes(5);
  });

  it("should not call the callback when delay is null", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, null));

    // Fast-forward time
    jest.advanceTimersByTime(5000);

    // The callback should not have been called
    expect(callback).not.toHaveBeenCalled();
  });

  it("should clear the interval when the component unmounts", () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useInterval(callback, 1000));

    // Fast-forward time
    jest.advanceTimersByTime(5000);

    // Unmount the component
    unmount();

    // Clear the previous timer calls
    callback.mockClear();

    // Fast-forward time again
    jest.advanceTimersByTime(5000);

    // The callback should not have been called after unmounting
    expect(callback).not.toHaveBeenCalled();
  });

  it("should update the interval when the delay changes", () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      {
        initialProps: { delay: 1000 },
      },
    );

    // Fast-forward time
    jest.advanceTimersByTime(5000);

    // The callback should have been called 5 times
    expect(callback).toHaveBeenCalledTimes(5);

    // Update the delay
    rerender({ delay: 500 });

    // Clear the previous timer calls
    callback.mockClear();

    // Fast-forward time again
    jest.advanceTimersByTime(5000);

    // The callback should have been called 10 times with the new delay
    expect(callback).toHaveBeenCalledTimes(10);
  });

  it("should use the latest callback", () => {
    let count = 0;
    const { rerender } = renderHook(
      ({ callback }) => useInterval(callback, 1000),
      {
        initialProps: {
          callback: () => {
            count += 1;
          },
        },
      },
    );

    // Fast-forward time
    jest.advanceTimersByTime(5000);

    expect(count).toBe(5);

    // Update the callback
    rerender({
      callback: () => {
        count += 2;
      },
    });

    // Fast-forward time again
    jest.advanceTimersByTime(5000);

    // The new callback should have been used
    expect(count).toBe(15);
  });
});
