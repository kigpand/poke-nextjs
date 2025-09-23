import { act, renderHook } from "@testing-library/react";
import { useModal } from "./useModal";

describe("useModal hook", () => {
  it("open시 modal이 보인다", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("close시 modal이 닫힌다", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("toggle시 isOpen이 true였으면 닫히고 false면 열린다", () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
