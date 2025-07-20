"use client";
import { SortType } from "@/types/SortType";
import { useState } from "react";
import { SortButtons } from "./SortButtons";

type Props = {
  handleCloseButton: () => void;
};

export function SortSelect({ handleCloseButton }: Props) {
  const [selectOption, setSelectOption] = useState<SortType>("id");

  return (
    <div className="w-full flex flex-col items-start">
      <label className="w-full font-bold text-foreground">정렬</label>
      <select
        className="mb-1 text-black font-bold border border-gray-300 h-7 w-full cursor-pointer"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectOption(e.target.value as SortType)
        }
      >
        <option value="id">도감번호</option>
        <option value="weight">무게</option>
        <option value="height">키</option>
        <option value="hp">HP</option>
        <option value="attack">공격</option>
        <option value="defense">방어</option>
        <option value="specialAttack">특수공격</option>
        <option value="specialDefense">특수방어</option>
        <option value="speed">스피드</option>
        <option value="allStat">총합</option>
      </select>
      <SortButtons type={selectOption} handleCloseButton={handleCloseButton} />
    </div>
  );
}
