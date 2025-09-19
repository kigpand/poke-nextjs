import { render, screen } from "@testing-library/react";
import BookmarkButton from "./BookmarkButton";
import { TEST_POKE } from "@/test/fixtures/pokemon";
import userEvent from "@testing-library/user-event";

// Jest에게 "@/hooks" 모듈을 가짜(mock) 모듈로 바꿔치기해라 라고 알림
// 실제 @/hooks 파일을 불러오는 대신, 우리가 지정한 객체를 반환.
// 즉, 앞으로 테스트 안에서는 import { useBookmark } from "@/hooks" 라고 해도 원래 코드에 있던 훅이 아니라, jest.fn()으로 만든 가짜 함수가 불려옴
jest.mock("@/hooks", () => ({
  useBookmark: jest.fn(),
}));

// 목(mock) 처리한 모듈 객체를 가져오는 함수.
// requireMock은 require랑 비슷하지만, mocked 버전을 반환.
// ➡️ 여기서 useBookmark는 jest.fn()으로 만든 가짜 함수고, 타입 단언(jest.Mock)을 붙여서 TS가 mockReturnValue 같은 메서드를 인식할 수 있게 합니다
const { useBookmark } = jest.requireMock("@/hooks") as {
  useBookmark: jest.Mock;
};

afterEach(() => {
  jest.clearAllMocks();
});

test("도감 버튼이 렌더링 되고 기본 라벨은 'Favorite'이다", () => {
  useBookmark.mockReturnValue({
    findBookmark: () => {
      return false;
    },
  });
  render(<BookmarkButton pokemon={TEST_POKE} />);

  expect(screen.getByRole("button", { name: "Favorite" })).toBeInTheDocument();
});

test("현재 포켓몬이 도감에 등록되어있을 경우 'Favorited'가 표출되며, removeBookmark 이벤트가 호출된다", async () => {
  const user = userEvent.setup();
  const removeBookmark = jest.fn();
  useBookmark.mockReturnValue({
    findBookmark: () => {
      return true;
    },
    removeBookmark,
  });

  render(<BookmarkButton pokemon={TEST_POKE} />);

  const button = screen.getByRole("button", { name: "Favorited" });
  expect(button).toBeInTheDocument();
  await user.click(button);
  expect(removeBookmark).toHaveBeenCalledTimes(1);
  expect(removeBookmark).toHaveBeenCalledWith(TEST_POKE);
});

test("현재 포켓몬이 도감에 없을 경우 'Favorite'가 표출되며, addBookmark 이벤트가 호출 된다", async () => {
  const user = userEvent.setup();
  const addBookmark = jest.fn();
  useBookmark.mockReturnValue({
    findBookmark: () => {
      return false;
    },
    addBookmark,
  });

  render(<BookmarkButton pokemon={TEST_POKE} />);

  const button = screen.getByRole("button", { name: "Favorite" });
  expect(button).toBeInTheDocument();
  await user.click(button);
  expect(addBookmark).toHaveBeenCalledTimes(1);
  expect(addBookmark).toHaveBeenCalledWith(TEST_POKE, expect.any(Function));
});
