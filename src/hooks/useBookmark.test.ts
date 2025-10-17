import { renderHook, act } from "@testing-library/react";
import { useBookmark } from "@/hooks/useBookmark";
import { useBookmarkStore } from "@/store/bookmarkStore";
import type { IPokemon } from "@/interface/IPokemon";
import { TEST_POKE } from "@/test/fixtures/pokemon";

beforeEach(() => {
  const { clearBookmark } = useBookmarkStore.getState();
  clearBookmark();
});

describe("useBookmark hook", () => {
  it("포켓몬을 추가할 수 있다", () => {
    const { result } = renderHook(() => useBookmark());

    act(() => {
      result.current.addBookmark(TEST_POKE, () => {});
    });

    expect(result.current.bookmarkList).toHaveLength(1);
    expect(result.current.bookmarkList[0].id).toBe(TEST_POKE.id);
  });

  it("등록된 포켓몬을 찾을 수 있다", () => {
    const { result } = renderHook(() => useBookmark());

    act(() => {
      result.current.addBookmark(TEST_POKE, () => {});
    });

    expect(result.current.findBookmark(TEST_POKE)).toBe(true);
  });

  it("등록된 포켓몬을 삭제할 수 있다", () => {
    const { result } = renderHook(() => useBookmark());

    act(() => {
      result.current.addBookmark(TEST_POKE, () => {});
      result.current.removeBookmark(TEST_POKE);
    });

    expect(result.current.bookmarkList).toHaveLength(0);
  });

  it("북마크를 초기화할 수 있다", () => {
    const { result } = renderHook(() => useBookmark());

    act(() => {
      result.current.addBookmark(TEST_POKE, () => {});
      result.current.clearBookmark();
    });

    expect(result.current.bookmarkList).toHaveLength(0);
  });
});
