import { render, screen } from "@testing-library/react";
import Search from "./Search";
import userEvent from "@testing-library/user-event";

const routerMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: routerMock }),
}));

const handleSearchMock = jest.fn();
jest.mock("@/utils/search", () => ({
  handleSearch: (...args: any[]) => handleSearchMock(...args),
}));

beforeEach(() => {
  routerMock.mockClear();
  handleSearchMock.mockClear();
});

test("search form이 렌더링 된다.", () => {
  render(<Search />);

  expect(screen.getByRole("search")).toBeInTheDocument();

  expect(screen.getByAltText("포켓몬 로고")).toBeInTheDocument();
});

test("엔터로 제출시 handleSearch가 호출되고 콜백으로 router.push가 호출된다.", async () => {
  const user = userEvent.setup();
  render(<Search />);

  const input = screen.getByRole("textbox", {
    name: "도감번호나 이름을 입력해주세요.",
  });

  // mockImplementation(fn)은 Jest에 “이 모의 함수가 호출되면 이렇게 행동해”라고 정의하는 것.
  // Search 컴포넌트가 handleSearch(searchRef, callback)으로 부를 테니, 인자 시그니처를 맞춰 (ref, cb)로 받습니다.
  // 실제 검색은 안 하고, **즉시 cb({ id: 3 })**를 호출 → 컴포넌트의 콜백에서 router.push("detail?id=3") 실행
  handleSearchMock.mockImplementation((ref: any, cb: (poke: any) => void) => {
    cb({ id: 3, name: "이상해꽃" });
  });

  // user.type은 사용자 타이핑을 시뮬레이션합니다.
  // "3"을 입력하고 "{enter}" 로 Enter 키를 누르는 동작을 진행
  await user.type(input, "3{enter}");

  expect(handleSearchMock).toHaveBeenCalledTimes(1);
  expect(routerMock).toHaveBeenCalledWith("detail?id=3");
});
