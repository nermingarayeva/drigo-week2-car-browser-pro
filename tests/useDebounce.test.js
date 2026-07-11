import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "../src/hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("delay bitənə qədər ilkin dəyəri saxlayır", () => {
    const { result } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "a" },
    });
    expect(result.current).toBe("a");
  });

  it("delay bitdikdən sonra son dəyərə yenilənir", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "a" },
    });

    rerender({ value: "ab" });
    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("ab");
  });

  it("delay bitmədən dəyər təkrar dəyişərsə, yalnız SON dəyəri tətbiq edir (debounce)", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "a" },
    });

    rerender({ value: "ab" });
    act(() => {
      vi.advanceTimersByTime(100); 
    });
    rerender({ value: "abc" });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("abc");
  });
});
