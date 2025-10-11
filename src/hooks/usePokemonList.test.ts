import { renderHook } from "@testing-library/react";
import { usePokemonList } from "./usePokemonList";
import { TEST_ARR_POKE } from "@/test/fixtures/pokemon";
import { usePokemonStore } from "@/store/pokemonStore";
import { useSearchParams } from "next/navigation";
import type { IPokemon } from "@/interface/IPokemon";

jest.mock("@/store/pokemonStore", () => ({
  usePokemonStore: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

function mockSearchParams(qs: string) {
  const usp = new URLSearchParams(qs);
  (useSearchParams as jest.Mock).mockReturnValue({
    get: (k: string) => usp.get(k),
  });
}

describe("usePokemonList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePokemonStore as unknown as jest.Mock).mockReturnValue({
      pokemonList: TEST_ARR_POKE,
    });
  });

  test("파라미터 없으면 원본 순서 그대로 반환한다", () => {
    mockSearchParams("");
    const { result } = renderHook(() => usePokemonList());
    const { pokemonList, filteredList } = result.current;

    expect(filteredList).toHaveLength(pokemonList.length);
    expect(filteredList.map((pokemon: IPokemon) => pokemon.name)).toEqual(
      pokemonList.map((pokemon: IPokemon) => pokemon.name)
    );
  });

  test("정렬: sortType=defense&sorting=desc 이면 방어력 내림차순", () => {
    mockSearchParams("sortType=defense&sorting=desc");

    const originalOrder = TEST_ARR_POKE.map(
      (pokemon: IPokemon) => pokemon.name
    );
    const { result } = renderHook(() => usePokemonList());
    const { filteredList } = result.current;

    for (let i = 0; i < filteredList.length - 1; i++) {
      const current = filteredList[i].defense;
      const next = filteredList[i + 1].defense;
      expect(current).toBeGreaterThanOrEqual(next);
    }

    expect(TEST_ARR_POKE.map((pokemon: IPokemon) => pokemon.name)).toEqual(
      originalOrder
    );
  });

  test("정렬: sortType=attack&sorting=asc 이면 공격력 오름차순", () => {
    mockSearchParams("sortType=attack&sorting=asc");

    const { result } = renderHook(() => usePokemonList());
    const { filteredList } = result.current;

    for (let i = 0; i < filteredList.length - 1; i++) {
      const current = filteredList[i].attack;
      const next = filteredList[i + 1].attack;
      expect(current).toBeLessThanOrEqual(next);
    }
  });

  test("타입 필터: type=fire 이면 불꽃 타입만 반환", () => {
    mockSearchParams("type=fire");

    const { result } = renderHook(() => usePokemonList());
    const { filteredList } = result.current;

    expect(filteredList.length).toBeGreaterThan(0);
    filteredList.forEach((pokemon: IPokemon) => {
      expect(
        (pokemon.types || []).map((t: string) => t.toLowerCase())
      ).toContain("fire");
    });

    expect(
      filteredList.every((pokemon: IPokemon) =>
        (pokemon.types || []).some((t: string) => t.toLowerCase() === "fire")
      )
    ).toBe(true);
  });

  test("세대 필터: generate=1 이면 '1세대'만 반환", () => {
    mockSearchParams("generate=1");

    const { result } = renderHook(() => usePokemonList());
    const { filteredList } = result.current;

    expect(filteredList.length).toBeGreaterThan(0);
    filteredList.forEach((pokemon: IPokemon) => {
      expect(pokemon.generate).toBe("1세대");
    });
  });
});
