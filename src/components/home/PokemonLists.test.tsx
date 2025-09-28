import { render, screen, fireEvent } from "@testing-library/react";
import PokemonLists from "./PokemonLists";

// VirtuosoGrid를 가벼운 목으로 대체
jest.mock("react-virtuoso", () => ({
  VirtuosoGrid: ({ data, itemContent, endReached, components }: any) => {
    const List = (components?.List ?? "div") as any;
    const Item = (components?.Item ?? "div") as any;
    return (
      <List data-testid="virtuoso-list">
        {data.map((item: any, i: number) => (
          <Item key={i}>{itemContent(i, item)}</Item>
        ))}
        <button
          type="button"
          data-testid="trigger-endReached"
          onClick={() => endReached?.()}
        />
      </List>
    );
  },
}));

jest.mock("@/hooks", () => ({
  usePokemonList: jest.fn(),
  useCurrentPokemonList: jest.fn(),
}));

jest.mock("../common", () => ({
  PokemonBox: ({ pokemon }: { pokemon: any }) => (
    <div data-testid="pokemon-box">{pokemon.name}</div>
  ),
}));

const { usePokemonList, useCurrentPokemonList } = jest.requireMock(
  "@/hooks"
) as {
  usePokemonList: jest.Mock;
  useCurrentPokemonList: jest.Mock;
};

// ------- 더미 데이터 유틸 --------
function makePokemon(id: number) {
  return { id, name: `poke-${id}` };
}
function makeList(n: number) {
  return Array.from({ length: n }, (_, i) => makePokemon(i + 1));
}
// ---------------------------------

describe("PokemonLists (current implementation)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("currentList를 렌더링한다", () => {
    usePokemonList.mockReturnValue({ pokemonList: makeList(20) });
    useCurrentPokemonList.mockReturnValue({
      currentList: makeList(5),
      handleAddCurrentList: jest.fn(),
    });

    render(<PokemonLists />);

    expect(screen.getAllByTestId("pokemon-box")).toHaveLength(5);
  });

  it("endReached를 트리거하지 않으면 handleAddCurrentList를 호출하지 않는다", () => {
    const handleAdd = jest.fn();

    usePokemonList.mockReturnValue({ pokemonList: makeList(30) });
    useCurrentPokemonList.mockReturnValue({
      currentList: makeList(9),
      handleAddCurrentList: handleAdd,
    });

    render(<PokemonLists />);

    expect(handleAdd).not.toHaveBeenCalled();
  });

  it("endReached 시 현재 길이 기준 다음 9개를 slice하여 handleAddCurrentList에 전달한다", () => {
    const handleAdd = jest.fn();

    const all = makeList(25);
    const already = makeList(9);

    usePokemonList.mockReturnValue({ pokemonList: all });
    useCurrentPokemonList.mockReturnValue({
      currentList: already,
      handleAddCurrentList: handleAdd,
    });

    render(<PokemonLists />);

    fireEvent.click(screen.getByTestId("trigger-endReached"));

    const expected = all.slice(already.length, already.length + 9);
    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith(expected);
  });

  it("남은 아이템이 9개 미만이면 남은 만큼만 전달한다", () => {
    const handleAdd = jest.fn();

    const all = makeList(12); // 총 12
    const already = makeList(9); // 남은 3개

    usePokemonList.mockReturnValue({ pokemonList: all });
    useCurrentPokemonList.mockReturnValue({
      currentList: already,
      handleAddCurrentList: handleAdd,
    });

    render(<PokemonLists />);
    fireEvent.click(screen.getByTestId("trigger-endReached"));

    const expected = all.slice(9, 18); // 실제로는 10~12만 존재
    expect(handleAdd).toHaveBeenCalledWith(expected);
  });
});
