"use client";
import { useModal } from "@/hooks/useModal";
import { BsFilterRight } from "react-icons/bs";

export function SortButton() {
  const { open, isOpen, close } = useModal();

  return (
    <button className="bg-background cursor-pointer border border-gray-400 p-1 rounded-xl hover:bg-gray-100">
      <BsFilterRight className="w-[30px] h-[30px]" />
    </button>
  );
}
