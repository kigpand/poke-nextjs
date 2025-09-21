import { getByRole, render, screen } from "@testing-library/react";
import { TypeButton } from "./TypeButton";
import userEvent from "@testing-library/user-event";

// ---- 모달/훅 모킹 준비 ----
const openMock = jest.fn();
const closeMock = jest.fn();

// 각 테스트에서 바꿀 수 있도록 isOpen을 변수로 둡니다
let isOpenState = false;

// useModal 모킹: 현재 isOpenState 값을 반환하게 함
jest.mock("@/hooks/useModal", () => ({
  useModal: () => ({
    open: openMock,
    close: closeMock,
    isOpen: isOpenState,
  }),
}));

// typeModal 간단한 렌더링
jest.mock("@/components/modal/TypeModal", () => ({
  TypeModal: ({ handleCloseModal }: { handleCloseModal: () => void }) => (
    <div role="dialog" aria-label="타입 모달">
      <button onClick={handleCloseModal}>모달 닫기</button>
    </div>
  ),
}));

beforeEach(() => {
  isOpenState = false;
  openMock.mockClear();
  closeMock.mockClear();
});

test("타입 모달 버튼 렌더링 테스트", () => {
  render(<TypeButton />);

  const button = screen.getByRole("button", { name: "타입 모달 오픈 버튼" });
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute("aria-haspopup", "dialog");
  expect(button).toHaveAttribute("aria-controls", "type-modal");
  expect(button).toHaveAttribute("aria-expanded", "false");
});

test("타입 모달 버튼 클릭 시 useModal.open 호출 테스트", async () => {
  const user = userEvent.setup();
  render(<TypeButton />);

  const button = screen.getByRole("button", { name: "타입 모달 오픈 버튼" });
  await user.click(button);
  expect(openMock).toHaveBeenCalledTimes(1);
});

test("타입 모달 버튼 클릭 시 typeModal 렌더링 테스트", () => {
  isOpenState = true;
  render(<TypeButton />);

  expect(screen.getByRole("dialog", { name: "타입 모달" })).toBeInTheDocument();
});

test("타입 모달 닫기 버튼 클릭시 useModal.close 호출 테스트", async () => {
  const user = userEvent.setup();
  isOpenState = true;
  render(<TypeButton />);

  const button = screen.getByText("모달 닫기");
  await user.click(button);
  expect(closeMock).toHaveBeenCalledTimes(1);
});
