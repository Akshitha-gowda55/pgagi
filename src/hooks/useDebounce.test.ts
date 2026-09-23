import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  it("returns the initial value immediately", () => {
    const { result } = renderHook(() =>
      useDebounce("hello", 400),
    );

    expect(result.current).toBe("hello");
  });

  it("delays updating the value", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: {
          value: "hello",
        },
      },
    );

    rerender({
      value: "world",
    });

    expect(result.current).toBe("hello");

    act(() => {
      vi.advanceTimersByTime(399);
    });

    expect(result.current).toBe("hello");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe("world");

    vi.useRealTimers();
  });

  it("resets the timer when the value changes quickly", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: {
          value: "first",
        },
      },
    );

    rerender({
      value: "second",
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({
      value: "third",
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe("first");

    act(() => {
      vi.advanceTimersByTime(199);
    });

    expect(result.current).toBe("first");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe("third");

    vi.useRealTimers();
  });
});