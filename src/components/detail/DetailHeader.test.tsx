import { render, screen } from "@testing-library/react";
import DetailHeader from "./DetailHeader";
import { TEST_POKE } from "@/test/fixtures/pokemon";

jest.mock("./BookmarkButton", () => () => <div data-testid="bookmark-btn" />);

test("포켓몬 상세 헤더 렌더링을 테스트 합니다", () => {
  render(<DetailHeader pokemon={TEST_POKE} />);

  expect(screen.getByText(TEST_POKE.name)).toBeInTheDocument();
  expect(screen.getByText(TEST_POKE.genus)).toBeInTheDocument();
});

test("홈 버튼은 '/'로 이동한다", () => {
  render(<DetailHeader pokemon={TEST_POKE} />);
  expect(screen.getByRole("link", { name: "홈으로" })).toHaveAttribute(
    "href",
    "/"
  );
});

describe("포켓몬 상세 헤더 nav arrow를 통해 포켓몬을 전환합니다", () => {
  it("입력한 prevId로 경로가 전환됩니다", () => {
    render(<DetailHeader pokemon={TEST_POKE} prevId={2} />);

    const prev = screen.getByRole("link", { name: "이전" });
    expect(prev).toHaveAttribute("href", "?id=2");
  });

  it("입력한 nextId로 경로가 전환됩니다", () => {
    render(<DetailHeader pokemon={TEST_POKE} nextId={2} />);

    const next = screen.getByRole("link", { name: "다음" });
    expect(next).toHaveAttribute("href", "?id=2");
  });
});

describe("포켓몬의 메가 진화 존재 여부에 따라 UI 및 동작을 판단합니다", () => {
  it("메가 진화가 없을 경우 메가진화 버튼이 표출되지 않습니다", () => {
    render(<DetailHeader pokemon={TEST_POKE} hasMega={false} />);

    // queryByRole: 있을 수도 있고 없을 수도 있다는 전제.
    // 요소를 찾으면 → 해당 요소 반환.
    // 요소가 없으면 → null을 반환 (에러 ❌).
    expect(
      screen.queryByRole("link", { name: "메가진화 전환" })
    ).not.toBeInTheDocument();
  });

  it("메가 진화가 있을 경우 메가진화 버튼이 표출되며 현재 메가진화 폼이 아닐 경우 '메가진화 전환' 텍스트가 표출됩니다.", () => {
    render(<DetailHeader pokemon={TEST_POKE} hasMega={true} />);
    const link = screen.getByRole("link", { name: "메가진화 전환" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `?id=${TEST_POKE.id}&isMega=true`);
    expect(screen.getByText("메가 폼")).toBeInTheDocument();
  });

  it("메가 진화가 있을 경우 메가진화 버튼이 표출되며 현재 메가진화 폼일 경우 '일반 폼' 텍스트가 표출됩니다.", () => {
    render(<DetailHeader pokemon={TEST_POKE} hasMega={true} isMega />);
    const link = screen.getByRole("link", { name: "메가진화 전환" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `?id=${TEST_POKE.id}&isMega=false`);
    expect(screen.getByText("일반 폼")).toBeInTheDocument();
  });
});
