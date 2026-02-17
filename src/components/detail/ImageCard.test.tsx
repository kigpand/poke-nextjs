import { render, screen } from "@testing-library/react";
import ImageCard from "./ImageCard";
import { TEST_POKE } from "@/test/fixtures/pokemon";
import { getLineColor, getTypeIcon } from "@/utils/converter";

jest.mock("@/utils/converter", () => ({
  getLineColor: jest.fn(),
  getTypeIcon: jest.fn(() => "/type.svg"),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test("상세 페이지 포켓몬 이미지가 제대로 렌더링 된다", () => {
  render(<ImageCard pokemon={TEST_POKE} />);

  const image = screen.getByRole("img", {
    name: `${TEST_POKE.name} 공식 아트워크`,
  });

  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", TEST_POKE.imageUrl);
  expect(image).toHaveAttribute("referrerpolicy", "no-referrer");
});

test("카드의 borderColor는 첫 번째 타입으로부터 계산된다", () => {
  (getLineColor as jest.Mock).mockReturnValue("rgb(255,0,0)");
  render(<ImageCard pokemon={{ ...TEST_POKE }} />);

  expect(getLineColor).toHaveBeenCalledWith(TEST_POKE.types![0]);
  expect(getTypeIcon).toHaveBeenCalledWith(TEST_POKE.types![0]);

  const img = screen.getByRole("img", {
    name: `${TEST_POKE.name} 공식 아트워크`,
  });
  const card = img.parentElement?.parentElement as HTMLElement;
  expect(card).toHaveStyle({ borderColor: "rgb(255, 0, 0)" });
});
