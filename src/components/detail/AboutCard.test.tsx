import { render, screen } from "@testing-library/react";
import AboutCard from "./AboutCard";
import { TEST_POKE } from "@/test/fixtures/pokemon";

jest.mock("@/utils/converter", () => ({
  getLineColor: jest.fn(() => "rgb(255, 0, 0)"),
}));

jest.mock("@/json/ability.json", () => ({
  __esModule: true,
  default: [
    { name: "Static", text: "정전기: 접촉 시 상대를 마비시킬 수 있다." },
    {
      name: "Lightning Rod",
      text: "피뢰침: 전기 기술을 끌어당겨 특공이 오른다.",
    },
  ],
}));

test("상세 페이지 포켓몬 카드 렌더링 확인", () => {
  render(<AboutCard pokemon={TEST_POKE} />);

  expect(screen.getByRole("region")).toBeInTheDocument();
});

test("특징이 제대로 표출 된다", () => {
  render(<AboutCard pokemon={TEST_POKE} />);

  expect(
    screen.getByText("큰 꽃잎을 펼쳐 햇빛을 받고 있으면 몸에 힘이 넘쳐흐른다.")
  ).toBeInTheDocument();
});
