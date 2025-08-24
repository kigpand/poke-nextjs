"use client";

import { useModal } from "@/hooks/useModal";
import { TypeModal } from "../../modal";
import { Shapes } from "lucide-react";

export function TypeButton() {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <button
        className="w-[40px] h-[40px] bg-background flex items-center justify-center cursor-pointer border border-gray-400 p-1 rounded-xl hover:bg-gray-100"
        onClick={open}
      >
        <Shapes />
      </button>
      {isOpen && <TypeModal handleCloseModal={close} />}
    </>
  );
}
