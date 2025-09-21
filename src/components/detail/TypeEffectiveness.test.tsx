import { render, screen } from "@testing-library/react";
import TypeEffectiveness from "./TypeEffectiveness";

jest.mock("@/utils/converter", () => ({
  getColor: jest.fn(() => "rgba(0, 0, 255, 1)"),
}));

const typesList = [
  {
    text: "바위",
    count: 1,
  },
  {
    text: "물",
    count: 1,
  },
  ,
  {
    text: "전기",
    count: 1,
  },
];

test("효과 탭 렌더링 테스트", () => {
  render(
    <TypeEffectiveness
      title="효과가 좋음"
      types={["바위", "물", "전기"]}
      value={2}
    />
  );

  expect(screen.getByText("효과가 좋음")).toBeInTheDocument();
  typesList.forEach((txt) => {
    expect(
      screen.getByRole("listitem", { name: `${txt!.text}x${2 / txt!.count}배` })
    );
  });
});
