import { act, renderHook } from "@testing-library/react";
import { usePokemonList } from "./usePokemonList";
import { TEST_POKE } from "@/test/fixtures/pokemon";

test("포켓몬 리스트가 등록되고 등록된 갯수만큼 리스트가 호출된다.", () => {
  const { result } = renderHook(() => usePokemonList());

  act(() => {
    result.current.handlePokemonList([TEST_POKE]);
  });

  expect(result.current.pokemonList).toHaveLength(1);

  act(() => {
    result.current.handlePokemonList([TEST_POKE, TEST_POKE, TEST_POKE]);
  });

  expect(result.current.pokemonList).toHaveLength(3);
});
