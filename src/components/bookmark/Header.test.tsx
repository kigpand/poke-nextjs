import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import userEvent from "@testing-library/user-event";

jest.mock("@/hooks", () => ({
  useBookmark: jest.fn(),
}));

const { useBookmark } = jest.requireMock("@/hooks") as {
  useBookmark: jest.Mock;
};

afterEach(() => {
  jest.clearAllMocks();
});

test("북마크 헤더가 렌더링 된다", () => {
  useBookmark.mockReturnValue({ bookmarkList: [] });
  render(<Header />);

  expect(
    screen.getByRole("heading", { level: 1, name: "bookmark-heading" })
  ).toBeInTheDocument();
});

test("홈으로 이동 버튼을 클릭하면 루트 경로로 이동하는 이벤트가 발생한다", () => {
  useBookmark.mockReturnValue({ bookmarkList: [] });
  render(<Header />);

  const button = screen.getByRole("link", { name: "홈으로 이동" });
  expect(button).toHaveAttribute("href", "/");
});

test("전체 비우기 버튼 누를시 clearBookmark가 호출된다", async () => {
  const clearBookmark = jest.fn();
  const user = userEvent.setup();
  useBookmark.mockReturnValue({ bookmarkList: [1], clearBookmark });
  render(<Header />);

  const button = screen.getByRole("button", { name: "북마크 전체 비우기" });
  await user.click(button);

  expect(clearBookmark).toHaveBeenCalledTimes(1);
});

test("도감에 등록된 포켓몬이 없으면 '전체 비우기' 버튼이 비활성화되고, 있으면 활성화된다", () => {
  useBookmark.mockReturnValue({ bookmarkList: [] });
  const { rerender } = render(<Header />);
  const button = screen.getByRole("button", { name: "북마크 전체 비우기" });
  expect(button).toBeDisabled();

  useBookmark.mockReturnValue({ bookmarkList: [{ id: 1 }] });
  rerender(<Header />);
  expect(button).not.toBeDisabled();
});

test("도감에 등록된 포켓몬이 없을 때는 '전체 비우기'를 눌러도 clearBookmark가 호출되지 않는다", async () => {
  const clearBookmark = jest.fn();
  const user = userEvent.setup();
  useBookmark.mockReturnValue({ bookmarkList: [], clearBookmark });
  render(<Header />);

  const button = screen.getByRole("button", { name: "북마크 전체 비우기" });
  await user.click(button);
  expect(clearBookmark).not.toHaveBeenCalled();
});

test("용량 텍스트가 도감 길이에 맞게 표시된다", () => {
  useBookmark.mockReturnValue({ bookmarkList: [{ id: 1 }] });
  render(<Header />);

  expect(screen.getByText(/용량 1 \/ \d+/)).toBeInTheDocument();
});
