import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("검색창 렌더링 확인", () => {
  render(<Header />);
  expect(
    screen.getByRole("search", { name: "포켓몬 검색창" })
  ).toBeInTheDocument();
});

test("필터링 modal 호출 버튼 렌더링 확인", () => {
  render(<Header />);
  expect(
    screen.getByRole("button", { name: "필터링 모달 호출 버튼" })
  ).toBeInTheDocument();
});

test("타입 modal 호출 버튼 렌더링 확인", () => {
  render(<Header />);
  expect(
    screen.getByRole("button", { name: "타입 모달 오픈 버튼" })
  ).toBeInTheDocument();
});

test("도감 페이지 이동 버튼 렌더링 및 동작 체크", () => {
  render(<Header />);
  const bookmark = screen.getByRole("link", { name: "도감 페이지 이동 버튼" });

  expect(bookmark).toBeInTheDocument();
  expect(bookmark).toHaveAttribute("href", "/bookmark");
});
