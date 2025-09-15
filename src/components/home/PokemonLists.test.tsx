import { render, screen } from "@testing-library/react";
import PokemonLists from "./PokemonLists";

// 훅/자식 컴포넌트 모듈 목킹
jest.mock("@/hooks", () => ({
  useScroll: jest.fn(),
  usePokemonList: jest.fn(),
  useCurrentPokemonList: jest.fn(),
}));

jest.mock("../common", () => ({
  PokemonBox: ({ pokemon }: { pokemon: any }) => (
    <li data-testid="pokemon-box">{pokemon.name}</li>
  ),
}));

// 가져온 목 함수들
const { useScroll, usePokemonList, useCurrentPokemonList } = jest.requireMock(
  "@/hooks"
) as {
  useScroll: jest.Mock;
  usePokemonList: jest.Mock;
  useCurrentPokemonList: jest.Mock;
};

// ------- 더미 데이터 유틸: 테스트 데이터를 짧고 명확하게 --------
function makePokemon(id: number) {
  return { id, name: `poke-${id}` };
}
function makeList(n: number) {
  return Array.from({ length: n }, (_, i) => makePokemon(i + 1));
}
// ---------------------------------------------------

describe("PokemonLists (current implementation)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // mockReturnValue => 함수가 호출될 때마다 반환 값을 정한다
  it("currentList를 렌더링한다", () => {
    useScroll.mockReturnValue({ scroll: 0 });
    usePokemonList.mockReturnValue({ pokemonList: makeList(20) });
    useCurrentPokemonList.mockReturnValue({
      currentList: makeList(5),
      handleAddCurrentList: jest.fn(),
    });

    render(<PokemonLists />);

    expect(screen.getAllByTestId("pokemon-box")).toHaveLength(5);
  });

  it("scroll === 0이면 handleAddCurrentList를 호출하지 않는다", () => {
    const handleAdd = jest.fn();

    useScroll.mockReturnValue({ scroll: 0 });
    usePokemonList.mockReturnValue({ pokemonList: makeList(30) });
    useCurrentPokemonList.mockReturnValue({
      currentList: makeList(9),
      handleAddCurrentList: handleAdd,
    });

    render(<PokemonLists />);
    expect(handleAdd).not.toHaveBeenCalled();
  });

  it("scroll !== 0이면 현재 길이 기준 다음 9개를 slice하여 handleAddCurrentList에 전달한다", () => {
    const handleAdd = jest.fn();

    const all = makeList(25); // 총 25개
    const already = makeList(9); // 이미 9개 로드됨 → 다음은 10~18

    useScroll.mockReturnValue({ scroll: 100 });
    usePokemonList.mockReturnValue({ pokemonList: all });
    useCurrentPokemonList.mockReturnValue({
      currentList: already,
      handleAddCurrentList: handleAdd,
    });

    render(<PokemonLists />);

    const expected = all.slice(already.length, already.length + 9);
    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith(expected);
  });

  it("남은 아이템이 9개 미만이면 남은 만큼만 전달한다", () => {
    const handleAdd = jest.fn();

    const all = makeList(12); // 총 12
    const already = makeList(9); // 남은 3개

    useScroll.mockReturnValue({ scroll: 50 });
    usePokemonList.mockReturnValue({ pokemonList: all });
    useCurrentPokemonList.mockReturnValue({
      currentList: already,
      handleAddCurrentList: handleAdd,
    });

    render(<PokemonLists />);

    const expected = all.slice(9, 18); // 실제로는 10~12만 존재
    expect(handleAdd).toHaveBeenCalledWith(expected);
  });
});
