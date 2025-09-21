import { render, screen } from "@testing-library/react";
import { SortButton } from "./SortButton";
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

// SortModal 모킹: 간단한 dialog와 닫기 버튼만 제공
jest.mock("@/components/modal/SortModal", () => ({
  SortModal: ({
    id,
    handleCloseModal,
  }: {
    id?: string;
    handleCloseModal: () => void;
  }) => (
    <div role="dialog" aria-label="정렬 모달" id={id}>
      <button onClick={handleCloseModal}>모달 닫기</button>
    </div>
  ),
}));

test("정렬 버튼 렌더링 테스트", () => {
  render(<SortButton />);

  const btn = screen.getByRole("button", { name: "필터링 모달 호출 버튼" });
  expect(btn).toBeInTheDocument();
  expect(btn).toHaveAttribute("aria-haspopup", "dialog");
  expect(btn).toHaveAttribute("aria-controls", "sort-modal");
  expect(btn).toHaveAttribute("aria-expanded", "false");
});

test("버튼 클릭 시 useModal.open이 호출된다", async () => {
  const user = userEvent.setup();
  render(<SortButton />);
  const btn = screen.getByRole("button", { name: "필터링 모달 호출 버튼" });

  await user.click(btn);
  expect(openMock).toHaveBeenCalledTimes(1);
});

test("Open이 true일 때 모달이 오픈된다", () => {
  isOpenState = true;
  render(<SortButton />);

  expect(screen.getByRole("dialog", { name: "정렬 모달" })).toBeInTheDocument();
});

test("모달을 닫을 시 useModal.close가 호출된다", async () => {
  const user = userEvent.setup();
  isOpenState = true;
  render(<SortButton />);

  const button = screen.getByText("모달 닫기");
  await user.click(button);
  expect(closeMock).toHaveBeenCalledTimes(1);
});
