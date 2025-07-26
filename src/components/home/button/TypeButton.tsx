"use client";

import { useModal } from "@/hooks/useModal";
import { TypeModal } from "../../modal";

export function TypeButton() {
  const { isOpen, open, close } = useModal();

  return (
    <div className="w-[100px] flex items-center md:items-start">
      <button
        className="bg-transparent text-gray-500 font-bold cursor-pointer border-none hover:scale-110"
        onClick={open}
      >
        타입보기
      </button>
      {isOpen && <TypeModal handleCloseModal={close} />}
    </div>
  );
}
