import { render, screen } from "@testing-library/react";
import { BookmarkLists } from "./BookmarkLists";
import userEvent from "@testing-library/user-event";

jest.mock("@/hooks", () => ({
  useBookmark: jest.fn(),
}));

const { useBookmark } = jest.requireMock("@/hooks") as {
  useBookmark: jest.Mock;
};

jest.mock("@/components/common", () => ({
  PokemonBox: ({ pokemon }: { pokemon: any }) => (
    <li data-testid="pokemon-box">{pokemon.name}</li>
  ),
}));

function makePokemon(id: number) {
  return { id, name: `poke-${id}` };
}
function makeList(n: number) {
  return Array.from({ length: n }, (_, i) => makePokemon(i + 1));
}

describe("도감 페이지 리스트 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("도감 페이지가 없을 시 '저장된 포켓몬이 없어요'를 표출한다", () => {
    useBookmark.mockReturnValue({ bookmarkList: [] });
    render(<BookmarkLists />);

    expect(screen.getByText("저장된 포켓몬이 없어요")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "포켓몬 리스트로 이동" })
    ).toBeInTheDocument();
  });

  it("도감 페이지에 아이템이 있을시 해당 갯수 만큼 리스트가 표출된다", () => {
    const bookmarkList = makeList(5);
    useBookmark.mockReturnValue({ bookmarkList });
    render(<BookmarkLists />);

    expect(screen.getAllByTestId("pokemon-box")).toHaveLength(5);
  });

  it("n번째 포켓몬 삭제를 클릭할 경우 삭제 함수가 호출된다", async () => {
    const removeBookmark = jest.fn();
    const bookmarkList = makeList(5);
    const user = userEvent.setup();
    useBookmark.mockReturnValue({
      bookmarkList,
      removeBookmark,
    });

    render(<BookmarkLists />);

    const target = screen.getByRole("button", { name: "poke-5 삭제" });
    await user.click(target);

    expect(removeBookmark).toHaveBeenCalledWith(bookmarkList[4]);
    expect(removeBookmark).toHaveBeenCalledTimes(1);
  });

  it("koreanName이 있으면 버튼 접근 이름에 koreanName을 사용한다", () => {
    const removeBookmark = jest.fn();
    const pokemon = { id: 1, name: "pikachu", koreanName: "피카츄" };
    useBookmark.mockReturnValue({ bookmarkList: [pokemon], removeBookmark });

    render(<BookmarkLists />);
    expect(
      screen.getByRole("button", { name: "피카츄 삭제" })
    ).toBeInTheDocument();
  });
});
