"use client";
import { SortModal } from "@/components/modal/SortModal";
import { useModal } from "@/hooks/useModal";
import { BsFilterRight } from "react-icons/bs";

export function SortButton() {
  const { open, isOpen, close } = useModal();

  return (
    <>
      <button
        aria-label="필터링 모달 호출 버튼"
        className="w-[40px] h-[40px] bg-background cursor-pointer border border-gray-400 p-1 rounded-xl hover:bg-gray-100"
        onClick={open}
      >
        <BsFilterRight className="w-[30px] h-[30px]" />
      </button>
      {isOpen && <SortModal handleCloseModal={close} />}
    </>
  );
}
