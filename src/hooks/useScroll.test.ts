import { act, renderHook } from "@testing-library/react";
import { useScroll } from "./useScroll";

test("초기 scroll의 위치는 0", () => {
  const { result } = renderHook(() => useScroll());

  expect(result.current.scroll).toBe(0);
});

test("스크롤된 500px 위치만큼 이동한다", () => {
  const { result } = renderHook(() => useScroll());

  act(() => {
    window.scrollY = 500;
    window.dispatchEvent(new Event("scroll"));
  });

  expect(result.current.scroll).toBe(500);
});
