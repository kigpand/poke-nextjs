import { render, screen } from "@testing-library/react";
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
}));

jest.mock("../common", () => ({
  PokemonBox: ({ pokemon }: { pokemon: any }) => (
    <div data-testid="pokemon-box">{pokemon.name}</div>
  ),
}));

const { usePokemonList } = jest.requireMock("@/hooks") as {
  usePokemonList: jest.Mock;
};

// ------- 더미 데이터 유틸 --------
function makePokemon(id: number) {
  return { id, name: `poke-${id}` };
}
function makeList(n: number) {
  return Array.from({ length: n }, (_, i) => makePokemon(i + 1));
}
// ---------------------------------

describe("PokemonLists (implementation)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("pokemonList를 입력받은 개수만큼 렌더링한다", () => {
    usePokemonList.mockReturnValue({ filteredList: makeList(50) });

    render(<PokemonLists />);

    expect(screen.getAllByTestId("pokemon-box")).toHaveLength(50);
  });
});
