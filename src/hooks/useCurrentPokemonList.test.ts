import { act, renderHook } from "@testing-library/react";
import { useCurrentPokemonList } from "./useCurrentPokemonList";
import { TEST_POKE } from "@/test/fixtures/pokemon";

describe("useCurrentPokemonList hook", () => {
  it("입력한 포켓몬 리스트를 현재 리스트와 교체한다", () => {
    const { result } = renderHook(() => useCurrentPokemonList());

    act(() => {
      result.current.handleChangeCurrentPokeList([TEST_POKE]);
    });

    expect(result.current.currentList).toHaveLength(1);
  });

  it("입력한 포켓몬 리스트를 현재 포켓몬 리스트에 더한다", () => {
    const { result } = renderHook(() => useCurrentPokemonList());

    act(() => {
      result.current.handleAddCurrentList([TEST_POKE]);
    });

    expect(result.current.currentList).toHaveLength(21);
  });
});
