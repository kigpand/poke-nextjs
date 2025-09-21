import { render, screen } from "@testing-library/react";
import { PokemonBox } from "./PokemonBox";
import { TEST_POKE } from "@/test/fixtures/pokemon";

test("포켓몬 box UI 렌더링 테스트", () => {
  render(<PokemonBox pokemon={TEST_POKE} />);

  expect(screen.getByRole("listitem")).toBeInTheDocument();
  expect(screen.getByText(`No.${TEST_POKE.id}`));
  expect(screen.getByText(TEST_POKE.name));
});

test("포켓몬 box 이미지 렌더링 테스트", () => {
  render(<PokemonBox pokemon={TEST_POKE} />);

  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", TEST_POKE.imageUrl);
  expect(image).toHaveAttribute("alt", TEST_POKE.name);
});

test("포켓몬 박스가 정상적인 상세 페이지 url을 갖는다", () => {
  render(<PokemonBox pokemon={TEST_POKE} />);

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", `/detail?id=${TEST_POKE.id}`);
});

test("포켓몬 박스 접근성 테스트", () => {
  render(<PokemonBox pokemon={TEST_POKE} />);

  expect(
    screen.getByRole("link", { name: `${TEST_POKE.name} 상세 페이지로 이동` })
  ).toBeInTheDocument();
  expect(screen.getByLabelText("포켓몬 넘버")).toHaveTextContent(
    `No.${TEST_POKE.id}`
  );
});
